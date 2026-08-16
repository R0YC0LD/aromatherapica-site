/* ==========================================================================
   Aromatherapica - Ana sayfa urun karuseli
   --------------------------------------------------------------------------
   Ana sayfadaki urun kartlari sablondan devralinan eski marka urunlerini
   gosteriyordu. Bu betik, kartlarin isaretlemesine hic dokunmadan yalnizca
   VERIYI degistirir: urun adi, fiyat ve gorsel adresleri gercek Aromatherapica
   katalogundan gelir. Boylece swiper/carousel yapisi ve stiller korunur.

   Kullanim:  node tools/homepage-products.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');
const CATALOG = path.join(ROOT, 'data', 'catalog.json');

const tl = new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 2
});

const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Sablondaki 6 urun yuvasi: eski ad, eski fiyat, eski gorsel adlari */
const SLOTS = [
    {
        id: '812343032064',
        name: 'D-Bronzi™ Bronzing Drops with Peptides',
        price: '$39.00',
        img: 'images/D-bronzi.png',
        hover: 'images/dotcom-plp-hover_d-bronzi-812343032064.jpg'
    },
    {
        id: '856556004180',
        name: 'B-Hydra™ Intensive Hydration Serum with Hyaluronic Acid',
        price: '$56.00',
        img: 'images/B-Hydra.png',
        hover: 'images/dotcom-plp-hover_b-hydra-856556004180.jpg'
    },
    {
        id: '999DE00000103',
        name: 'Protini™ Polypeptide Firming Refillable Moisturizer',
        price: '$24.00 - to $99.00',
        img: 'images/Protini-Cream.png',
        hover: 'images/dotcom-plp-hover_protini-999DE00000103.jpg'
    },
    {
        id: '812343034358',
        name: 'C-Firma Fresh Vitamin-C Day Serum',
        price: '$79.00',
        img: 'images/C-Firma.png',
        hover: 'images/dotcom-plp-hover_c-firma-812343034358.jpg'
    },
    {
        id: '999DE00000104',
        name: 'T.L.C. Framboos™ Glycolic Resurfacing Night Serum',
        price: '$90.00 - to $134.00',
        img: 'images/TLC-Framboos.png',
        hover: 'images/dotcom-plp-hover_Framboos-999DE00000104.jpg'
    },
    {
        id: '999DE00000100',
        name: 'A-Passioni™ Retinol Cream',
        price: '$76.00',
        img: 'images/A-Passioni.png',
        hover: 'images/dotcom-plp-hover_A-Pass-999DE00000100.jpg'
    }
];

function main() {
    const cat = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));

    // Vitrine gorseli olan, farkli kategorilerden urunler secilir.
    // Kupon/test kayitlari vitrine cikmamali.
    const HARIC = /^(coupon|kupon|test|deneme)\b/i;
    const withImg = cat.products.filter(p =>
        p.imageUrl && p.active !== false && p.stock > 0 && !HARIC.test(p.name));
    const secilen = [];
    const gorulen = new Set();
    for (const p of withImg) {
        if (gorulen.has(p.categoryName)) continue;
        gorulen.add(p.categoryName);
        secilen.push(p);
        if (secilen.length === SLOTS.length) break;
    }
    // kategori cesitliligi yetmezse kalanlarla tamamla
    for (const p of withImg) {
        if (secilen.length >= SLOTS.length) break;
        if (!secilen.includes(p)) secilen.push(p);
    }

    let html = fs.readFileSync(SRC, 'utf8');
    let degisiklik = 0;

    SLOTS.forEach((slot, i) => {
        const p = secilen[i];
        if (!p) return;

        const before = html;

        // 1) urun adi (metin dugumu, title ve hidden input degerleri)
        html = html.split(slot.name).join(p.name);
        // HTML olarak kacislanmis hali (& -> &amp;)
        if (slot.name.includes('&')) html = html.split(esc(slot.name)).join(esc(p.name));

        // 2) fiyat
        html = html.split(slot.price).join(tl.format(p.salePrice || p.price));

        // 3) gorseller (ana ve hover) - katalogdaki gercek gorsel
        html = html.split(slot.img).join(p.imageUrl);
        html = html.split(slot.hover).join(p.imageUrl);

        if (html !== before) degisiklik++;
        console.log(`  ${String(i + 1)}. yuva -> ${p.name}  ${tl.format(p.salePrice || p.price)}`);
    });

    /* Hero/kampanya gorselleri de katalogdan gelsin.
       KamoHPHeroBanner-Big dosyasi depodan silindigi icin 404 veriyordu. */
    const HERO = [
        'images/KamoHPHeroBanner-Big-ezgif.com-compress-jpg.jpg',
        'images/KamoHPHeroBanner-Small-ezgif.com-compress-jpg.jpg',
        'images/Kamo-PDP-14_Arm-Swatch-ezgif.com-compress-jpg.jpg',
        'images/DE-08-11-2026_KamoTravelBag-popup.jpg',
        'images/Spring-26_Moisture-Kit_Creative-01_2000px_300dpi-ezgif.com-compress-jpg-BIG.jpg',
        'images/Spring-26_Moisture-Kit_Creative-05_2000px_300dpi-ezgif.com-resize-SMALL.jpg'
    ];
    HERO.forEach((eski, i) => {
        const p = secilen[i % secilen.length];
        if (p && html.includes(eski)) {
            html = html.split(eski).join(p.imageUrl);
            console.log(`  hero gorseli -> ${p.name}`);
        }
    });

    // Footer'daki tanitim urunu de katalogdan gelsin
    const one = secilen[0];
    if (one) {
        html = html.split('Protini™ Polypeptide Cream Travel size').join(one.name);
        html = html.split('images/footer-Protini-img.jpg').join(one.imageUrl);
        html = html.split('images/protini-ugc.jpg').join(one.imageUrl);
    }

    fs.writeFileSync(SRC, html, 'utf8');
    console.log(`\n${degisiklik} urun yuvasi gercek katalog verisiyle guncellendi.`);
}

main();
