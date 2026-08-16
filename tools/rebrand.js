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
        const out = attrs.replace(/(href=")([^"]*)(")/i, (m, a, val, b) => {
            const y = karar(val);
            return y === null ? m : a + y + b;
        });
        return `<a ${out}>`;
    });
}

/* ------------------------------------------------------------------- ana */

function htmlDosyalari() {
    const out = [];
    (function gez(dir) {
        for (const f of fs.readdirSync(dir)) {
            if (/^(\.git|node_modules|tools|data)$/.test(f)) continue;
            // referans kazimalari donusturulmez
            if (/^(kategorikismi|ürüne özel)/.test(f)) continue;
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
        const up = /^(collections|urun)\//.test(rel) ? '../../' : '';
        html = baglantilar(html, up, slug);

        if (html !== src) {
            fs.writeFileSync(file, html, 'utf8');
            dosya++; toplam += n;
        }
    }
    console.log(`  ${dosya} dosya, ${toplam} marka gecisi donusturuldu.`);
}

main();
