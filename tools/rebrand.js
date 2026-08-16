/* ==========================================================================
   Aromatherapica - Marka donusumu ve ic baglantilar
   --------------------------------------------------------------------------
   Sablonlar eski markanin canli sitesinden alindigi icin her uretimden sonra
   marka adlari, sosyal hesaplar ve alan adlari donusturulmelidir.

   Ayrica <a> baglantilari yerel sayfalara baglanir:
     - /collections/<slug>/  -> uretilen kategori sayfasi
     - yerel karsiligi olmayan tum ic yollar -> ana sayfa
   Boylece hicbir tiklama 404 vermez.

   Kullanim:  node tools/rebrand.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const CATALOG = path.join(ROOT, 'data', 'catalog.json');

/* Uzun anahtarlar once uygulanir (kismi eslesme bozulmasin) */
const MARKA = {
    'Drunk Elephant Home': 'Aromatherapica ana sayfa',
    'Drunk Elephant logo': 'Aromatherapica logosu',
    'drunk elphant instagram page image': 'Aromatherapica Instagram görseli',
    'visit the drunk elephant instagram page': 'Aromatherapica Instagram sayfasını ziyaret et',
    'Go to the Drunk Elephant': 'Aromatherapica',
    'The Drunk Mag': 'Aromatherapica Blog',
    'Drunk Glossary': 'Aromatherapica Sözlüğü',
    'Drunk Merch': 'Aromatherapica Ürünleri',
    'Drunk Life': 'Öne Çıkanlar',
    'Drunk_Elephant': 'Aromatherapica',
    'Drunk Elephant': 'Aromatherapica',
    'DrunkElephantSkinCare': 'aromatherapica',
    'DrunkElephantSkincare': 'aromatherapica',
    '@drunkelephant': '@aromatherapica',
    'Sites-itemmaster_drunkelephant': 'Sites-itemmaster_aromatherapica',
    'Sites-drunkelephant_us': 'Sites-aromatherapica_us',
    'sites-drunkelephant_us': 'sites-aromatherapica_us',
    'drunkelephant_us': 'aromatherapica_us',
    'drunkelephant.com': 'aromatherapica.com',
    'drunkelephant.ca': 'aromatherapica.ca',
    'drunkelephant.co.uk': 'aromatherapica.co.uk',
    'drunkelephant.jp': 'aromatherapica.jp',
    'drunkelephant.de': 'aromatherapica.de',
    'drunkelephant.fr': 'aromatherapica.fr',
    'drunkelephant': 'aromatherapica',
    'drunk elephant': 'Aromatherapica'
};

const ANAHTARLAR = Object.keys(MARKA).sort((a, b) => b.length - a.length);

/* ------------------------------------------------------------- baglantilar */

function slugSeti() {
    const d = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
    return {
        kategori: new Set(d.categories.map(c => c.slug)),
        urun: new Set(d.products.map(p => p.slug))
    };
}

/* Yalnizca <a> etiketleri islenir; stylesheet/script yollarina dokunulmaz. */
function baglantilar(html, up, slug) {
    const home = up || './';
    const karar = (ham) => {
        const v = String(ham).trim();
        if (v === '' || /^(#|mailto:|tel:|javascript:|data:)/i.test(v)) return null;
        let p = v.replace(/^https?:\/\/(?:www\.)?aromatherapica\.com/i, '');
        if (/^https?:\/\//i.test(p) || /^\/\//.test(p)) return null;   // dis site
        const norm = p.replace(/^(?:\.\.\/|\/)+/, '');
        if (norm === '') return home;

        const k = norm.match(/^collections\/([a-z0-9-]+)\/?$/i);
        if (k && slug.kategori.has(k[1].toLowerCase())) return `${up}collections/${k[1].toLowerCase()}/`;

        const u = norm.match(/^urun\/([a-z0-9-]+)\/?$/i);
        if (u && slug.urun.has(u[1].toLowerCase())) return `${up}urun/${u[1].toLowerCase()}/`;

        return home;
    };
    return html.replace(/<a\s([^>]*?)>/gi, (tag, attrs) => {
        // Sepet ikonu/baglantisi her zaman sepet sayfasina gitmeli
        if (/\b(mini-cart-link|de-cart-icon|de-nav-cart-link)\b/.test(attrs) ||
            /data-cart-view/.test(attrs)) {
            const yeni = attrs
                .replace(/(href=")([^"]*)(")/i, `$1${up}sepet/$3`)
                .replace(/\sinactiveLink\b/, '')
                .replace(/(title=")[^"]*(")/i, '$1Sepetim$2')
                .replace(/(aria-label=")[^"]*(")/i, '$1Sepeti aç$2');
            return `<a ${yeni}>`;
        }
        const out = attrs.replace(/(href=")([^"]*)(")/i, (m, a, val, b) => {
            const y = karar(val);
            return y === null ? m : a + y + b;
        });
        return `<a ${out}>`;
    });
}

/* ------------------------------------------------------- urun adi izleri */

/* Sablonlar eski markanin urun sayfalarindan alindigi icin isaretlemenin
   icinde o urunlerin adlari kaliyor: gorsel alt metinleri, data-product-name
   oznitelikleri, boyut secenekleri ve JSON veri bloklari.

   Uzun adlar once degistirilir; sonra tekil marka kelimeleri temizlenir. */
const URUN_ADLARI = [
    'Bora Barrier Rich Repair Refillable Moisturizer with 6-Butterlipid Complex',
    'B-Hydra™ Intensive Hydration Serum with Hyaluronic Acid',
    'T.L.C. Framboos™ Glycolic Resurfacing Night Serum',
    'Lala Retro™ Nourishing Whipped Refillable Moisturizer',
    'Protini™ Polypeptide Firming Refillable Moisturizer',
    'Kamo Triple-Peptide™ Multi-Use Serum Foundation',
    'D-Bronzi™ Bronzing Drops with Peptides',
    'Protini™ Polypeptide Cream Travel size',
    'Protini™ Polypeptide Cream Refill',
    'C-Firma Fresh Vitamin-C Day Serum',
    'Protini™ Polypeptide Cream - Big',
    'Beste™ No. 9 Jelly Cleanser',
    'C-Tango™ Vitamin C Eye Cream',
    'A-Passioni™ Retinol Cream',
    'Protini™ Polypeptide Cream',
    'Kamo Triple-Peptide™',
    'Lala Retro™',
    'Bora Barrier',
    'A-Passioni',
    'T.L.C. Framboos',
    'D-Bronzi',
    'B-Hydra',
    'C-Firma',
    'C-Tango',
    'Framboos',
    'Protini',
    'Sukari',
    'Beste',
    'Kamo',
    'Lala'
];

/* Sayfanin kendi urununun adi (varsa) yerine gecer; yoksa marka adi. */
function sayfaninUrunAdi(html) {
    const m = html.match(/<script type="application\/json" id="arp-urun">([\s\S]*?)<\/script>/);
    if (!m) return null;
    try { return JSON.parse(m[1]).name || null; } catch (e) { return null; }
}

/* URL icindeki eski urun slug'lari (kamo-triple-peptide..., protini-...).
   Buyuk/kucuk harfe duyarsizdir ama yalnizca slug bicimindeki (tireli)
   kaliplari hedefler; Turkce metinlere dokunmaz. */
const URUN_SLUGLARI = /\b(?:kamo-triple-peptide|protini-polypeptide|protini-powerpeptide|c-firma-fresh|b-hydra-intensive|lala-retro|beste-no\.?-?9|c-tango-vitamin|virgin-marula|a-passioni-retinol|t\.l\.c\.-framboos|d-bronzi-bronzing|bora-barrier)[a-z0-9.-]*/gi;

function urunAdiIzleri(html) {
    const yerine = sayfaninUrunAdi(html) || 'Aromatherapica';
    let n = 0;

    /* Dosya yollari en basta maskelenir. Aksi halde urun adi degisimi
       "images/..._KamoTravelBag-popup.jpg" gibi dosya adlarinin icine de
       girip var olmayan dosyalara referans olusturuyordu.

       Isaretci bosluga bagli OLMAMALI: onceki surumde " YOL0 " kullaniliyordu.
       Bitisik iki oznitelikte (" YOL0  YOL1 ") ilk eslesme aradaki boslugu
       tuketiyor, ikincisi geri konamiyordu. Sonuc: bozuk href/src
       oznitelikleri ve stilsiz sayfalar. */
    const kasa = [];
    html = html.replace(/\s(?:src|href|data-src|data-href)="[^"]*"/gi, (m) => {
        kasa.push(m);
        return `@@ARPYOL${kasa.length - 1}@@`;
    });

    for (const ad of URUN_ADLARI) {
        if (!html.includes(ad)) continue;
        n += html.split(ad).length - 1;
        html = html.split(ad).join(yerine);
    }
    // Ticari marka isareti eski adlardan artakalmis olabilir
    html = html.replace(new RegExp(escapeRegExp(yerine) + '™', 'g'), yerine);

    // Sablondan kalan yapisal veri (JSON-LD) baska urunleri tarif ediyor;
    // arama motorlarina yanlis bilgi vermemesi icin kaldirilir.
    html = html.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/gi,
        (blok) => URUN_SLUGLARI.test(blok) ? '' : blok);

    // Kalan slug'lar (veri oznitelikleri, inline js degiskenleri)
    let oncesi = html;
    html = html.replace(URUN_SLUGLARI, 'aromatherapica-urun');
    if (html !== oncesi) n++;

    /* Kucuk harfli kalintilar: kazima sirasinda bozulmus oznitelikler ve
       analitik yapilandirmalari. "Lala" ve "Beste" listede DEGILDIR, cunku
       Turkce "Damlalari" / "Phenylalanine" kelimelerinin icinde geciyorlar. */
    const GUVENLI = /\b(?:protini|kamo|framboos|c-firma|b-hydra|c-tango|a-passioni|sukari|bora barrier|d-bronzi)[a-z0-9_-]*/gi;

    oncesi = html;
    html = html.replace(GUVENLI, yerine);
    if (html !== oncesi) n++;

    // Basta maskelenen dosya yollarini geri koy
    html = html.replace(/@@ARPYOL(\d+)@@/g, (m, i) => kasa[+i]);

    return { html, n };
}

function escapeRegExp(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* --------------------------------------------------------------- gorseller */

/* Sablonlardaki logolar eski markanin fil cizimidir (SVG path'leri).
   Ayni kutu olculeriyle "Aromatherapica" yazisina cevrilir; boylece
   yerlesim ve CSS gecisleri bozulmaz. */
const LOGO_YAZI = (w, h, vb, fs, ls) =>
    `<svg width="${w}" height="${h}" viewBox="${vb}" fill="none" xmlns="http://www.w3.org/2000/svg">` +
    `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ` +
    `font-family="BrownRegular, 'Segoe UI', Arial, sans-serif" font-size="${fs}" ` +
    `letter-spacing="${ls}" fill="#45474A">Aromatherapica</text></svg>`;

const LOGO_KUTU = {
    'de-text-logo': LOGO_YAZI(180, 10, '0 0 180 10', 9.5, 1.6),
    'de-logo-icon': LOGO_YAZI(70, 30, '0 0 450 200', 46, 2),
    'footer-full-logo': LOGO_YAZI(243, 140, '0 0 243 140', 22, 1.4)
};

function logolar(html) {
    for (const [cls, yeni] of Object.entries(LOGO_KUTU)) {
        const isaret = `<span class="svg-icon ${cls}">`;
        let i;
        while ((i = html.indexOf(isaret)) >= 0) {
            const svgBas = html.indexOf('<svg', i);
            const svgSon = html.indexOf('</svg>', svgBas);
            if (svgBas < 0 || svgSon < 0) break;
            const mevcut = html.slice(svgBas, svgSon + 6);
            if (mevcut.includes('Aromatherapica')) break;   // zaten donusturulmus
            html = html.slice(0, svgBas) + yeni + html.slice(svgSon + 6);
        }
    }
    return html;
}

/* Instagram bolumundeki musteri fotograflari eski markanin urunlerini
   gosteriyor. Marka amblemiyle degistirilir. */
function gorselIzleri(html, up) {
    // hem yerel (images/IMG_1234.jpg) hem uzak CDN bicimini yakala
    html = html.replace(/(<img[^>]*src=")[^"]*IMG_\d+\.jpg("[^>]*>)/g,
        `$1${up}images/aromatherapica-emblem.png$2`);
    html = html.replace(/(<img[^>]*src=")(?:\.\.\/)*images\/(?:protini-ugc|footer-Protini-img|Protini-Cream|Steven_Selfie[^"]*)\.(?:jpg|png)("[^>]*>)/g,
        `$1${up}images/aromatherapica-emblem.png$2`);
    // eski markanin etiketi
    html = html.replace(/#barewithus/gi, '#aromatherapica');
    return html;
}

/* ------------------------------------------------------------------- ana */

function htmlDosyalari() {
    const out = [];
    (function gez(dir) {
        for (const f of fs.readdirSync(dir)) {
            if (/^(\.git|node_modules|tools|data)$/.test(f)) continue;
            // referans kazimalari donusturulmez
            if (/^(kategorikismi|ürüne özel|site sepet)/.test(f)) continue;
            const fp = path.join(dir, f);
            const st = fs.statSync(fp);
            if (st.isDirectory()) gez(fp);
            else if (/\.html?$/i.test(f)) out.push(fp);
        }
    })(ROOT);
    return out;
}

function main() {
    const slug = slugSeti();
    let dosya = 0, toplam = 0;

    for (const file of htmlDosyalari()) {
        const src = fs.readFileSync(file, 'utf8');
        let html = src, n = 0;

        for (const k of ANAHTARLAR) {
            if (!html.includes(k)) continue;
            n += html.split(k).length - 1;
            html = html.split(k).join(MARKA[k]);
        }

        /* Son sup"urme: kazima sirasinda bozulmus isaretleme
           (ornegin  drunk="" elephant"  seklinde oznitelige donusmus adlar),
           slug listeleri ve tekil kalan gecisler. Projede "drunk"/"elephant"
           kelimelerinin mesru bir kullanimi yok, bu yuzden guvenli. */
        const oncekiUzunluk = html.length;
        html = html
            .replace(/drunk(?:=""\s*)?[\s_-]*elephant(?:['’]s)?(?:=""\s*)?/gi, 'Aromatherapica')
            .replace(/the-drunk-life/gi, 'one-cikanlar')
            .replace(/the-drunk-mag/gi, 'blog')
            .replace(/drunkhalloffame/gi, 'hall-of-fame')
            .replace(/drunk-with-peptides/gi, 'peptitli')
            .replace(/drunk-life/gi, 'one-cikanlar')
            .replace(/drunk-mag/gi, 'blog')
            .replace(/#drunk[a-z]*/gi, '#aromatherapica')
            .replace(/\bdrunk\b/gi, 'aromatherapica')
            .replace(/\belephant\b/gi, 'aromatherapica');
        if (html.length !== oncekiUzunluk) n++;

        const rel = path.relative(ROOT, file).replace(/\\/g, '/');
        const up = /^(collections|urun)\//.test(rel) ? '../../'
            : (/^sepet\//.test(rel) ? '../' : '');

        html = logolar(html);
        html = gorselIzleri(html, up);
        const ua = urunAdiIzleri(html); html = ua.html; n += ua.n;
        html = baglantilar(html, up, slug);

        if (html !== src) {
            fs.writeFileSync(file, html, 'utf8');
            dosya++; toplam += n;
        }
    }
    console.log(`  ${dosya} dosya, ${toplam} marka gecisi donusturuldu.`);
}

main();
