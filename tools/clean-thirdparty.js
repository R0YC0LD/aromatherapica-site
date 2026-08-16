/* ==========================================================================
   Aromatherapica - Olu ucuncu parti entegrasyonlarin temizligi
   --------------------------------------------------------------------------
   Sablon, eski markanin ticari hesaplarina bagli servisleri iceriyordu:
   Salesforce canli destek, Attentive SMS etiketi, Riskified, DynamicYield,
   MotionPoint. Bu servisler bizim icin calismiyor; tarayici konsolunda CORS
   ve ag hatalari uretiyor ve disari istek atiyorlar.

   Bu betik ilgili script etiketlerini ve inline bloklari HTML'den cikarir.
   Sayfa yapisina, stillere ve calisan islevlere dokunmaz.

   Kullanim:  node tools/clean-thirdparty.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* Kaldirilacak desenler: [aciklama, duzenli ifade] */
const KURALLAR = [
    ['DynamicYield preconnect/dns-prefetch',
        /[ \t]*<link[^>]*(?:preconnect|dns-prefetch)[^>]*dynamicyield\.com[^>]*>\s*/gi],
    ['DynamicYield script',
        /[ \t]*<script[^>]*src="[^"]*(?:api_dynamic|api_static|dynamicyield)\.js"[^>]*>\s*<\/script>\s*/gi],
    ['DynamicYield yapilandirmasi',
        /[ \t]*<script>\s*\/\/\s*<!\[CDATA\[\s*window\.DY[\s\S]*?\/\/\s*\]\]>\s*<\/script>\s*/gi],
    ['Riskified beacon script',
        /[ \t]*<script[^>]*src="https:\/\/beacon\.riskified\.com[^"]*"[^>]*>\s*<\/script>\s*/gi],
    ['Riskified inline blok',
        /[ \t]*<script[^>]*>\s*\(function\(\)\s*\{\s*function riskifiedBeaconLoad[\s\S]*?<\/script>\s*/gi],
    ['Attentive (dtag) script',
        /[ \t]*<script[^>]*src="[^"]*dtag\.js"[^>]*>\s*<\/script>\s*/gi],
    // Attentive etiketi: yuklenemezse eski markanin CDN'inden yedek cekiyordu
    ['Attentive atLabel etiketi',
        /[ \t]*<script[^>]*src="[^"]*\/providers\/atLabel\/load"[^>]*>\s*<\/script>\s*/gi],
    ['Salesforce canli destek blogu',
        /[ \t]*<script[^>]*>\s*(?:\/\/[^\n]*\n\s*)?let ipAddress;[\s\S]*?<\/script>\s*/gi],
    ['Salesforce sohbet butonu',
        /[ \t]*<div class="arp-chat-button"[\s\S]*?<\/div>\s*/gi],
    // DY scripti kaldirildiginda bu zamanlayici tanimsiz cagri yapip
    // sonsuz hata dongusune giriyordu (clearInterval'a hic ulasamiyor).
    ['DynamicYield sepet senkron zamanlayicisi',
        /[ \t]*<script>\s*var syncEvent = setInterval[\s\S]*?<\/script>\s*/gi],
    // Canli destek blogu kaldirilinca bu onload cagrisi tanimsiz kaliyordu.
    // Script etiketi korunur, yalnizca cagri silinir.
    ['Salesforce onload cagrisi',
        / onload="initEmbeddedMessaging\(\)"/gi],
    // OneTrust cerez onayi eski markanin hesabina bagliydi; yapilandirmasini
    // cekemedigi icin konsolda JSON ayristirma hatasi uretiyordu.
    ['OneTrust cerez onayi',
        /[ \t]*<script[^>]*src="[^"]*(?:OtAutoBlock|otSDKStub)\.js"[^>]*>\s*<\/script>\s*/gi],
    ['OneTrust sarmalayici',
        /[ \t]*<script type="text\/javascript">\s*function OptanonWrapper\(\)[^<]*<\/script>\s*/gi],
    // Google Tag Manager konteyneri eski markanin analytics hesabina bagliydi.
    // window.dataLayer googletagmanagerpageload.js icinde tanimlandigi icin
    // kaldirilmasi baska kodu bozmaz.
    ['GTM konteyner scripti',
        /[ \t]*<script[^>]*src="(?:\.\.\/)*js\/gtm\.js"[^>]*>\s*<\/script>\s*/gi],
    ['GTM inline yukleyici',
        /[ \t]*<script>\s*\(function\(w,d,s,l,i\)\{[\s\S]*?googletagmanager\.com\/gtm\.js[\s\S]*?<\/script>\s*/gi],
    // Sunucu tarafi olmadigi icin bu Demandware yollari 404 donuyordu
    ['Demandware main.js scripti',
        /[ \t]*<script[^>]*src="\/on\/demandware\.static\/[^"]*\/main\.js"[^>]*>\s*<\/script>\s*/gi],
    ['Eski PayPal yukleyicisi',
        /[ \t]*loadScript\("\/on\/demandware\.static\/Sites-nars_us-Site[^"]*"[^;]*;\s*/gi]
];

function htmlFiles() {
    const out = [];
    (function walk(dir) {
        for (const f of fs.readdirSync(dir)) {
            if (/^(\.git|node_modules|tools|data)$/.test(f)) continue;
            const fp = path.join(dir, f);
            const st = fs.statSync(fp);
            if (st.isDirectory()) walk(fp);
            else if (/\.html?$/i.test(f)) out.push(fp);
        }
    })(ROOT);
    return out;
}

function main() {
    const sayac = {};
    let dosya = 0;

    for (const file of htmlFiles()) {
        const src = fs.readFileSync(file, 'utf8');
        let html = src;
        for (const [ad, re] of KURALLAR) {
            const oncesi = html;
            html = html.replace(re, '\n');
            if (html !== oncesi) {
                const adet = (oncesi.match(re) || []).length;
                sayac[ad] = (sayac[ad] || 0) + adet;
            }
        }
        if (html !== src) { fs.writeFileSync(file, html, 'utf8'); dosya++; }
    }

    for (const [ad, n] of Object.entries(sayac)) {
        console.log(`  ${ad.padEnd(38)} ${n} blok kaldirildi`);
    }
    console.log(`\n${dosya} HTML dosyasi temizlendi.`);
}

main();
