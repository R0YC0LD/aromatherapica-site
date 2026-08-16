/* ==========================================================================
   Aromatherapica - Eski marka adi tasiyan dosyalarin yeniden adlandirilmasi
   --------------------------------------------------------------------------
   Sablonlardan gelen bazi gorsel dosyalari eski markanin urun adlarini
   tasiyor (Kamo..., Protini..., DE-08-...). Bu adlar sayfa kaynagi
   goruntulendiginde ortaya cikiyor.

   Dosyalar yeniden adlandirilir ve HTML/CSS icindeki referanslari guncellenir.
   Sadece bir kez calisir; ad zaten degismisse dokunmaz.

   Kullanim:  node tools/rename-assets.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const TR = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };

/* Eski marka adini tasiyan dosya adlarini notr bir ada cevirir */
function yeniAd(eski) {
    const uzanti = path.extname(eski);
    let taban = path.basename(eski, uzanti)
        .replace(/[çğıöşü]/gi, c => TR[c.toLowerCase()] || c)
        .replace(/DE-?\d[\d-]*_?/gi, '')
        .replace(/DE\d+_?/gi, '')
        .replace(/\b\d{9,}\b/g, '')
        .replace(/kamo/gi, 'urun')
        .replace(/protini/gi, 'urun')
        .replace(/tiffany[_-]?note/gi, 'not')
        .replace(/dotcom-plp-hover/gi, 'urun-hover')
        .replace(/[^a-zA-Z0-9._-]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^[-_.]+|[-_.]+$/g, '')
        .toLowerCase();
    if (!taban) taban = 'gorsel';
    return 'arp-' + taban + uzanti.toLowerCase();
}

const DE_DESEN = /kamo|protini|drunkelephant|^DE-?\d|^DE\d/i;

function metinDosyalari() {
    const out = [];
    (function gez(dir) {
        for (const f of fs.readdirSync(dir)) {
            if (/^(\.git|node_modules|tools|data)$/.test(f)) continue;
            if (/^(kategorikismi|ürüne özel|site sepet)/.test(f)) continue;
            const fp = path.join(dir, f);
            const st = fs.statSync(fp);
            if (st.isDirectory()) gez(fp);
            else if (/\.(html?|css|js|json)$/i.test(f)) out.push(fp);
        }
    })(ROOT);
    return out;
}

/* Eslemeyi kalici tutuyoruz: dosyalar bir kez yeniden adlandirilir ama
   sayfalar her derlemede sablondan yeniden uretildigi icin ESKI adlari
   yeniden icerir. Kalici harita olmadan referanslar guncellenmeden kaliyor
   ve var olmayan dosyalara isaret ediyordu. */
const HARITA = path.join(ROOT, 'data', 'asset-renames.json');

function haritaOku() {
    try { return new Map(Object.entries(JSON.parse(fs.readFileSync(HARITA, 'utf8')))); }
    catch (e) { return new Map(); }
}

function haritaYaz(m) {
    fs.mkdirSync(path.dirname(HARITA), { recursive: true });
    fs.writeFileSync(HARITA, JSON.stringify(Object.fromEntries(m), null, 1), 'utf8');
}

function main() {
    const esleme = haritaOku();
    const yeniSayisi = { n: 0 };

    for (const klasor of ['images', 'media']) {
        const dizin = path.join(ROOT, klasor);
        if (!fs.existsSync(dizin)) continue;
        for (const f of fs.readdirSync(dizin)) {
            const fp = path.join(dizin, f);
            if (fs.statSync(fp).isDirectory()) continue;
            if (!DE_DESEN.test(f)) continue;
            const yeni = yeniAd(f);
            if (yeni === f) continue;
            const hedef = path.join(dizin, yeni);
            if (!fs.existsSync(hedef)) fs.renameSync(fp, hedef);
            else fs.unlinkSync(fp);
            esleme.set(f, yeni);
            yeniSayisi.n++;
        }
    }

    haritaYaz(esleme);

    /* Referans guncellemesi haritaya bagli DEGIL: sayfalar her derlemede
       sablondan yeniden uretildigi icin eski adlari tekrar iceriyorlar.
       Bu yuzden "dosya yok ama yeni adi var" durumunu kendimiz tespit edip
       duzeltiyoruz. Boylece harita kaybolsa bile sistem kendini onarir. */
    const varMi = (klasor, ad) => fs.existsSync(path.join(ROOT, klasor, ad));

    let dosya = 0, toplam = 0;
    for (const file of metinDosyalari()) {
        const src = fs.readFileSync(file, 'utf8');
        let n = 0;
        const html = src.replace(
            /(images|media)\/([A-Za-z0-9._@()%+-]+\.(?:png|jpe?g|svg|gif|webp|mp4|webm))/g,
            (tam, klasor, ad) => {
                if (varMi(klasor, ad)) return tam;              // dosya duruyor
                const yeni = yeniAd(ad);
                if (yeni !== ad && varMi(klasor, yeni)) { n++; return `${klasor}/${yeni}`; }
                return tam;
            });
        if (html !== src) { fs.writeFileSync(file, html, 'utf8'); dosya++; toplam += n; }
    }

    console.log(`  ${yeniSayisi.n} dosya yeniden adlandirildi, ` +
        `${toplam} referans duzeltildi (${dosya} dosyada)`);
}

main();
