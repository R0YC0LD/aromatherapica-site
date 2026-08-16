/* ==========================================================================
   Aromatherapica - Teknik isim temizligi
   --------------------------------------------------------------------------
   Kullaniciya gorunmeyen ama eski markanin adini tasiyan CSS sinifi, ID ve
   veri-oznitelik adlarini yeniden adlandirir.

   Yeniden adlandirma HTML + CSS + JS dosyalarinda AYNI ANDA yapilir; boylece
   secici eslesmeleri bozulmaz. Uzun anahtarlar once islenir ki kismi
   eslesmeler ("de-drunk-life" ile "de-drunk-life-item") birbirini bozmasin.

   Kullanim:  node tools/rename-tokens.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* eski -> yeni  (uzunluk sirasina gore uygulanir) */
const TOKENS = {
    'customDrunkUSchatButton': 'customArpChatButton',
    'drunkUS-miaw-button': 'arp-chat-button',
    'drunk-life-page-wrapper': 'arp-featured-page-wrapper',
    'de-drunk-life-item': 'de-featured-life-item',
    'drunk-mag-tag-landing': 'arp-blog-tag-landing',
    'drunk-life-image-block': 'arp-featured-image-block',
    'drunk-mag-landing': 'arp-blog-landing',
    'drunk-mag-article': 'arp-blog-article',
    'isDrunkLifePage': 'isFeaturedPage',
    'de-page-drunk_life': 'de-page-featured',
    'drunk-life-heart': 'arp-life-heart',
    'de-drunk-life': 'de-featured-life',
    'shiseidoamericasdrunkelephant.mpeasylink.com': 'ceviri.aromatherapica.com',
    'Sites-itemmaster_drunkelephant': 'Sites-itemmaster_aromatherapica',
    'Drunk-Glossary': 'Aromatherapica-Glossary',
    'Drunk Glossary': 'Aromatherapica Sözlüğü',
    'the drunk mag': 'aromatherapica blog',
    'Drunk Life': 'Öne Çıkanlar'
};

const EXT = /\.(html?|css|js)$/i;
/* Uretilmis/kopya dosyalar ve saticiya ait buyuk kutuphaneler disarida */
const SKIP_DIR = /(^|[\\/])(\.git|node_modules|tools|data)([\\/]|$)/;

function files() {
    const out = [];
    (function walk(dir) {
        for (const f of fs.readdirSync(dir)) {
            const fp = path.join(dir, f);
            if (SKIP_DIR.test(path.relative(ROOT, fp))) continue;
            const st = fs.statSync(fp);
            if (st.isDirectory()) walk(fp);
            else if (EXT.test(f)) out.push(fp);
        }
    })(ROOT);
    return out;
}

function main() {
    const keys = Object.keys(TOKENS).sort((a, b) => b.length - a.length);
    let dosya = 0, toplam = 0;

    for (const file of files()) {
        let src;
        try { src = fs.readFileSync(file, 'utf8'); } catch { continue; }
        let html = src, n = 0;

        for (const k of keys) {
            if (!html.includes(k)) continue;
            const adet = html.split(k).length - 1;
            html = html.split(k).join(TOKENS[k]);
            n += adet;
        }

        if (html !== src) {
            fs.writeFileSync(file, html, 'utf8');
            dosya++; toplam += n;
            console.log(`  ${path.relative(ROOT, file).replace(/\\/g, '/').padEnd(48)} ${n} degisiklik`);
        }
    }
    console.log(`\n${dosya} dosya, ${toplam} teknik isim guncellendi.`);
}

main();
