/* ==========================================================================
   Aromatherapica - Ticimax urun listesi ice aktarimi
   --------------------------------------------------------------------------
   Kaynak : data/urunler.xlsx  (Ticimax urun disa aktarimi, 138 urun)
   Cikti  : data/catalog.json  (kategori agaci + urunler)

   XLSX bir ZIP arsividir; disari bagimlilik eklememek icin gerekli iki parca
   (sharedStrings.xml ve sheet1.xml) dogrudan cozulur.

   Kategori agaci BREADCRUMBKAT sutunundan kurulur ("A>B>C" bicimi) ve
   uc seviyeye kadar desteklenir. Onceki catalog.json'da gorsel adresi olan
   urunlerin gorselleri ada gore eslestirilip korunur.

   Kullanim:  node tools/import-xlsx.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const XLSX = path.join(ROOT, 'data', 'urunler.xlsx');
const OUT = path.join(ROOT, 'data', 'catalog.json');

/* ------------------------------------------------------- zip cozumleyici */

/* Merkezi dizinden dosyalari okur; yalnizca store(0) ve deflate(8) destegi
   yeterli - xlsx bu ikisini kullanir. */
function unzip(buf) {
    const files = {};
    // "End of central directory" imzasini sondan ara
    let eocd = -1;
    for (let i = buf.length - 22; i >= 0; i--) {
        if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('Gecersiz zip: EOCD bulunamadi');

    const count = buf.readUInt16LE(eocd + 10);
    let p = buf.readUInt32LE(eocd + 16);

    for (let i = 0; i < count; i++) {
        if (buf.readUInt32LE(p) !== 0x02014b50) break;
        const method = buf.readUInt16LE(p + 10);
        const compSize = buf.readUInt32LE(p + 20);
        const nameLen = buf.readUInt16LE(p + 28);
        const extraLen = buf.readUInt16LE(p + 30);
        const commentLen = buf.readUInt16LE(p + 32);
        const localOff = buf.readUInt32LE(p + 42);
        const name = buf.toString('utf8', p + 46, p + 46 + nameLen);

        // yerel basligi okuyup veri baslangicini bul
        const lNameLen = buf.readUInt16LE(localOff + 26);
        const lExtraLen = buf.readUInt16LE(localOff + 28);
        const dataStart = localOff + 30 + lNameLen + lExtraLen;
        const raw = buf.slice(dataStart, dataStart + compSize);

        files[name] = method === 0 ? raw : zlib.inflateRawSync(raw);
        p += 46 + nameLen + extraLen + commentLen;
    }
    return files;
}

/* --------------------------------------------------------------- xlsx okuma */

const unesc = s => String(s)
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

function readSheet() {
    const files = unzip(fs.readFileSync(XLSX));
    const ssXml = (files['xl/sharedStrings.xml'] || Buffer.from('')).toString('utf8');
    const strings = [...ssXml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m =>
        unesc([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(x => x[1]).join('')));

    const sheetName = Object.keys(files).find(f => /^xl\/worksheets\/sheet1\.xml$/.test(f));
    const sh = files[sheetName].toString('utf8');

    const rows = [...sh.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map(r => {
        const o = {};
        for (const c of r[1].matchAll(/<c r="([A-Z]+)\d+"(?:[^>]*t="([^"]*)")?[^>]*>([\s\S]*?)<\/c>/g)) {
            const v = (c[3].match(/<v>([\s\S]*?)<\/v>/) || [])[1];
            const inline = (c[3].match(/<is>[\s\S]*?<t[^>]*>([\s\S]*?)<\/t>/) || [])[1];
            let val = inline !== undefined ? unesc(inline) : v;
            if (c[2] === 's' && v !== undefined) val = strings[+v];
            o[c[1]] = val === undefined ? '' : String(val);
        }
        return o;
    });
    return rows;
}

/* ------------------------------------------------------------------ slug */

const TR = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'İ': 'i', 'Ç': 'c', 'Ğ': 'g', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' };
function slugify(s) {
    return String(s).trim()
        .replace(/[çğıöşüİÇĞÖŞÜ]/g, ch => TR[ch] || ch)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/* ------------------------------------------------------------------- ana */

function main() {
    const rows = readSheet();
    const head = rows[0];
    // basliklari sutun harfine esle (sutun sirasi degisirse de calissin)
    const col = {};
    for (const [k, v] of Object.entries(head)) col[v] = k;

    const need = ['URUNADI', 'BREADCRUMBKAT', 'SATISFIYATI'];
    for (const n of need) if (!col[n]) throw new Error(`Sutun bulunamadi: ${n}`);

    const get = (r, name) => (col[name] ? (r[col[name]] || '') : '');

    // onceki katalogdan gorselleri koru
    let eskiGorsel = {};
    if (fs.existsSync(OUT)) {
        try {
            const eski = JSON.parse(fs.readFileSync(OUT, 'utf8'));
            (eski.products || []).forEach(p => {
                if (p.imageUrl) eskiGorsel[p.name.trim().toLowerCase()] = p.imageUrl;
            });
        } catch { /* ilk calistirma */ }
    }

    /* --- kategori agaci --- */
    const cats = [];
    const catId = new Map();      // "A>B>C" -> id
    function ensureCat(parts) {
        let parentId = null;
        for (let i = 0; i < parts.length; i++) {
            const yol = parts.slice(0, i + 1).join('>');
            if (!catId.has(yol)) {
                const id = cats.length + 1;
                catId.set(yol, id);
                cats.push({
                    id, parentId, name: parts[i], slug: slugify(parts[i]),
                    sortOrder: cats.length + 1, active: true, path: yol
                });
            }
            parentId = catId.get(yol);
        }
        return parentId;
    }

    /* --- urunler --- */
    const products = [];
    for (const r of rows.slice(1)) {
        const ad = get(r, 'URUNADI').trim();
        if (!ad) continue;

        const yol = get(r, 'BREADCRUMBKAT').trim() || 'Diğer Ürünler';
        const parts = yol.split('>').map(s => s.trim()).filter(Boolean);
        const categoryId = ensureCat(parts);

        const fiyat = parseFloat(get(r, 'SATISFIYATI')) || 0;
        const indirimli = parseFloat(get(r, 'INDIRIMLIFIYAT')) || 0;

        products.push({
            id: get(r, 'URUNKARTIID') || String(products.length + 1),
            sku: get(r, 'STOKKODU'),
            barcode: get(r, 'BARKOD'),
            slug: slugify(ad),
            name: ad,
            categoryId,
            categoryName: parts[parts.length - 1],
            categoryPath: yol,
            brandName: get(r, 'MARKA') || null,
            price: fiyat,
            salePrice: indirimli > 0 && indirimli < fiyat ? indirimli : null,
            currency: get(r, 'PARABIRIMI') || 'TL',
            stock: parseInt(get(r, 'STOKADEDI'), 10) || 0,
            active: get(r, 'URUNAKTIF') !== '0',
            imageUrl: eskiGorsel[ad.toLowerCase()] || null,
            shortDesc: get(r, 'ONYAZI').replace(/\s*\n\s*/g, ' ').trim() || null,
            description: get(r, 'ACIKLAMA').trim() || null,
            seoTitle: (() => { const t = get(r, 'SEO_SAYFABASLIK').trim(); return (!t || t === 'TİCİMAX') ? null : t; })(),
            seoDesc: (() => { const t = get(r, 'SEO_SAYFAACIKLAMA').trim(); return (!t || t === 'TİCİMAX') ? null : t; })()
        });
    }

    const out = {
        source: 'data/urunler.xlsx',
        importedAt: new Date().toISOString(),
        categories: cats,
        products
    };
    fs.writeFileSync(OUT, JSON.stringify(out, null, 1), 'utf8');

    /* --- ozet --- */
    const sayim = {};
    products.forEach(p => { sayim[p.categoryPath] = (sayim[p.categoryPath] || 0) + 1; });
    console.log(`  urun    : ${products.length}`);
    console.log(`  kategori: ${cats.length} (${cats.filter(c => !c.parentId).length} ust seviye)`);
    console.log(`  gorselli: ${products.filter(p => p.imageUrl).length}`);
    console.log('\n  kategori agaci:');
    const yaz = (parentId, girinti) => {
        cats.filter(c => c.parentId === parentId).forEach(c => {
            const kendi = products.filter(p => p.categoryId === c.id).length;
            const alt = (function say(id) {
                let n = products.filter(p => p.categoryId === id).length;
                cats.filter(x => x.parentId === id).forEach(x => { n += say(x.id); });
                return n;
            })(c.id);
            console.log(`  ${girinti}${c.name.padEnd(34 - girinti.length)} ${String(alt).padStart(3)}${kendi !== alt ? ` (dogrudan ${kendi})` : ''}`);
            yaz(c.id, girinti + '  ');
        });
    };
    yaz(null, '  ');
}

main();
