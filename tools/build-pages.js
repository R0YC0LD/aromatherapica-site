/* ==========================================================================
   Aromatherapica - Kategori ve urun sayfalari
   --------------------------------------------------------------------------
   Sablonlar (tasarim birebir korunur):
     kategori : "kategorikismi ürün sekmesi/index.html"
     urun     : "ürüne özel sekme referans/index.html"

   Bu sablonlarin yalnizca VERI tasiyan kisimlari degistirilir; isaretleme,
   sinif adlari ve stiller oldugu gibi kalir. Boylece search.bundle.css ve
   product.bundle.css ile gelen gorunum bozulmaz.

   Cikti:
     collections/<slug>/index.html   (22 kategori)
     urun/<slug>/index.html          (138 urun)

   Kullanim:  node tools/build-pages.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PLP_SRC = path.join(ROOT, 'kategorikismi ürün sekmesi', 'index.html');
const PDP_SRC = path.join(ROOT, 'ürüne özel sekme referans', 'index.html');
const CATALOG = path.join(ROOT, 'data', 'catalog.json');

/* ------------------------------------------------------------- yardimcilar */

const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const tl = new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 2
});

/* Ic ice etiketleri sayarak bir blogun bitisini bulur */
function blokSonu(html, bas, tag) {
    const acik = new RegExp(`<${tag}\\b`, 'gi');
    const kapali = new RegExp(`</${tag}>`, 'gi');
    let d = 0, p = bas;
    while (p < html.length) {
        acik.lastIndex = p; kapali.lastIndex = p;
        const a = acik.exec(html), k = kapali.exec(html);
        if (!k) return -1;
        if (a && a.index < k.index) { d++; p = a.index + 1; }
        else { d--; if (d === 0) return k.index + tag.length + 3; p = k.index + 1; }
    }
    return -1;
}

/* Sinifa gore blogun [bas, son] araligini dondurur */
function blokAralik(html, cls, tag = 'div') {
    const i = html.indexOf(`class="${cls}`);
    if (i < 0) return null;
    const bas = html.lastIndexOf(`<${tag}`, i);
    if (bas < 0) return null;
    const son = blokSonu(html, bas, tag);
    return son < 0 ? null : [bas, son];
}

/* Bir blogun ICERIGINI degistirir (dis etiket korunur) */
function icerikDegistir(html, cls, yeniIcerik, tag = 'div') {
    const ar = blokAralik(html, cls, tag);
    if (!ar) return html;
    const acilisSonu = html.indexOf('>', ar[0]) + 1;
    const kapanisBasi = ar[1] - (tag.length + 3);
    return html.slice(0, acilisSonu) + yeniIcerik + html.slice(kapanisBasi);
}

/* Goreli varlik yollarini sayfa derinligine gore duzeltir */
function rebase(html, up) {
    if (!up) return html;
    html = html.replace(/(\s(?:href|src|data-src)=")((?:css|js|images|media|fonts|data)\/)/g, `$1${up}$2`);
    html = html.replace(/(url\(\s*["']?)((?:images|fonts)\/)/g, `$1${up}$2`);
    return html;
}

const TRMAP = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'İ': 'i', 'Ç': 'c', 'Ğ': 'g', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' };
const slugify = s => String(s).trim()
    .replace(/[çğıöşüİÇĞÖŞÜ]/g, c => TRMAP[c] || c)
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* --------------------------------------------------------------- katalog */

function loadCatalog() {
    const d = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
    const cats = d.categories.filter(c => c.active !== false);
    const prods = d.products.filter(p => p.active !== false);
    const byId = new Map(cats.map(c => [c.id, c]));
    const children = id => cats.filter(c => c.parentId === id);
    const roots = cats.filter(c => !c.parentId || !byId.has(c.parentId));
    const soy = id => { const o = [id]; for (const c of children(id)) o.push(...soy(c.id)); return o; };
    const productsOf = id => { const s = new Set(soy(id)); return prods.filter(p => s.has(p.categoryId)); };
    const leaves = id => {
        const o = [];
        (function gez(pid) {
            for (const c of children(pid)) {
                if (prods.some(p => p.categoryId === c.id)) o.push(c);
                gez(c.id);
            }
        })(id);
        return o;
    };
    const yol = id => { const o = []; let c = byId.get(id); while (c) { o.unshift(c); c = c.parentId ? byId.get(c.parentId) : null; } return o; };
    return { cats, prods, byId, children, roots, productsOf, leaves, yol };
}

const INGREDIENTS = fs.existsSync(path.join(ROOT, 'images', 'ingredients'))
    ? fs.readdirSync(path.join(ROOT, 'images', 'ingredients')).filter(f => f.endsWith('.svg')).map(f => f.replace(/\.svg$/, ''))
    : [];

function urunGorseli(p, up) {
    if (p.imageUrl) return p.imageUrl;
    const hay = (p.slug || '') + ' ' + (p.name || '').toLowerCase();
    const hit = INGREDIENTS.slice().sort((a, b) => b.length - a.length).find(i => hay.includes(i));
    return hit ? `${up}images/ingredients/${hit}.svg` : `${up}images/product-placeholder.svg`;
}

const urunYolu = (p, up) => `${up}urun/${p.slug}/`;

/* ------------------------------------------------------- kategori sayfasi */

/* Sablonun kart isaretlemesi birebir korunur; yalnizca veri degisir. */
function urunKarti(p, up) {
    const gorsel = urunGorseli(p, up);
    const indirim = p.salePrice && p.salePrice < p.price;
    const fiyat = indirim ? p.salePrice : p.price;
    const id = esc(p.id);

    /* Sarmalayici .product-card izgaradaki sutun genisligini belirler;
       .de-featured-life-item ise kart ic yerlesimini verir. Ikisi de
       sablondaki ile birebir ayni olmali, aksi halde kartlar kuculuyor. */
    return `
<div class="product-card">
<div class="js-product-card de-product-card redesign-product-card de-featured-life-item loaded" data-trigger="scroll" aria-labelledby="product-id-${id}" id="card-${id}" role="group">
<div class="de-card-main">
<a class="thumb-link" href="${esc(urunYolu(p, up))}" title="" data-pid="${id}">
<div class="de-cropped-image-wrapper animated slow fadeIn on-load" style="background-color: #FAFAFA">
<img src="${esc(gorsel)}" alt="${esc(p.name)}" width="460" height="460" class="plp-image-hover">
<div class="product-badge-wrapper">
${indirim ? '<div class="de-new-badge">İndirim</div>' : ''}
<div class="de-marketing-badge">${esc(p.categoryName || '')}</div>
</div>
</div>
<div class="de-product-detail">
<span class="low-in-stock empty-span"></span>
<div class="de-product-title animated slideInUp" id="title-${id}">
<div class="name productname-text" title="Ürüne git: ${esc(p.name)}" id="product-id-${id}" style="-webkit-box-orient: vertical;">
${esc(p.name)}
</div>
<div class="price">
<span class="de-product-price">
<span class="price-sales">
<span name="price-${id}">
${indirim ? `<span class="price-standard">${tl.format(p.price)}</span> ` : ''}${tl.format(fiyat)}
</span>
</span>
</span>
</div>
</div>
</div>
</a>
<div class="de-card-bottom">
<div class="js-quick-shop-wrapper de-quick-shop">
<div class="de-inner">
<a class="de-btn de-btn--black arp-plp-cta" href="${esc(urunYolu(p, up))}">${p.stock > 0 ? 'İncele' : 'Tükendi'}</a>
</div>
</div>
</div>
</div>
</div>
</div>`;
}

/* Sol taraftaki kategori filtreleri gercek kategori agacina baglanir */
function filtreListesi(cat, aktif, up) {
    return cat.roots.map(r => {
        const alt = cat.leaves(r.id);
        const satir = (c, seviye) => {
            const n = cat.productsOf(c.id).length;
            const secili = c.id === aktif.id;
            return `<li class="refinement-item${seviye ? ' refinement-sub' : ''}">
<a class="${secili ? 'active ' : ''}refinement-link" href="${esc(`${up}collections/${c.slug}/`)}">${esc(c.name)} <span class="refinement-count">${n}</span></a>
</li>`;
        };
        return satir(r, 0) + alt.map(c => satir(c, 1)).join('');
    }).join('');
}

/* ---------------------------------------------------------- urun sayfasi */

/* Sablondaki ornek urunun yerine gecen degerler.
   Isaretlemeye dokunulmaz; yalnizca veri degistirilir. */
const PDP_ORNEK = {
    ad: 'Protini™ Polypeptide Firming Refillable Moisturizer',
    kisaAd: 'Protini™',
    pazarlama: 'be a firm believer',
    baslik: 'Firming and moisturizing peptide cream | Drunk Elephant'
};

function urunSayfasi(p, cat, plpTemplate, up) {
    let s = plpTemplate;

    // 1) urun adi (tum gecisler: baslik, JSON veri, alt metinler)
    s = s.split(PDP_ORNEK.ad).join(p.name);
    s = s.split(esc(PDP_ORNEK.ad)).join(esc(p.name));

    // 2) fiyat: sablondaki tum dolar tutarlarini urunun fiyatiyla degistir
    const indirim = p.salePrice && p.salePrice < p.price;
    const gosterilen = tl.format(indirim ? p.salePrice : p.price);
    s = s.replace(/\$\d[\d,]*\.\d{2}/g, gosterilen);

    // 3) gorseller: sablonun urun fotograflari yerine bu urunun gorseli
    const gorsel = urunGorseli(p, up);
    s = s.replace(/(?:\.\.\/\.\.\/)?images\/Protini-PDP_[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp)/g, gorsel);
    s = s.replace(/(?:\.\.\/\.\.\/)?images\/Protini[A-Za-z0-9._-]*\.(?:jpg|jpeg|png|webp)/g, gorsel);
    // uzak CDN'deki sablon gorselleri
    s = s.replace(/https:\/\/[^"']*\/products\/images\/[^"']*\.(?:jpg|jpeg|png|webp)[^"']*/g, gorsel);

    // 4) pazarlama metni ve aciklama
    if (p.shortDesc) s = s.split(PDP_ORNEK.pazarlama).join(p.shortDesc);

    // 5) baslik ve aciklama
    s = s.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.name)} | Aromatherapica</title>`);
    s = s.replace(/(<meta name="description" content=")[^"]*(")/,
        `$1${esc((p.seoDesc || p.shortDesc || p.name).slice(0, 300))}$2`);

    // 6) ekmek kirintisi: kategori yolu
    const yol = cat.yol(p.categoryId);
    const kirinti = `<a href="${up}">Ana Sayfa</a>` +
        yol.map(c => ` / <a href="${up}collections/${c.slug}/">${esc(c.name)}</a>`).join('') +
        ` / <span>${esc(p.name)}</span>`;
    s = icerikDegistir(s, 'de-breadcrumb', `<div class="arp-kirinti">${kirinti}</div>`, 'nav');

    return s;
}

/* ------------------------------------------------------------------- ana */

function main() {
    const cat = loadCatalog();
    const up = '../../';

    let plp = fs.readFileSync(PLP_SRC, 'utf8');
    plp = rebase(plp, up);

    let uretilenKategori = 0;
    for (const c of cat.cats) {
        const urunler = cat.productsOf(c.id);
        let sayfa = plp;

        // 1) urun izgarasi
        sayfa = icerikDegistir(sayfa, 'js-product-container product-tile-container',
            urunler.length
                ? urunler.map(p => urunKarti(p, up)).join('\n')
                : `<div class="arp-bos-kategori"><p>Bu kategoride henüz ürün yok.</p><a class="de-btn de-btn--black" href="${up}">Ana sayfaya dön</a></div>`);

        // 2) kategori filtreleri
        sayfa = icerikDegistir(sayfa, 'sort-filters-wrapper', filtreListesi(cat, c, up), 'ul');

        // 3) baslik ve aciklama
        sayfa = sayfa.replace(/<title>[^<]*<\/title>/, `<title>${esc(c.name)} | Aromatherapica</title>`);
        sayfa = sayfa.replace(/(<meta name="description" content=")[^"]*(")/,
            `$1${esc(c.seoDesc || `${c.name} kategorisindeki doğal Aromatherapica ürünleri.`)}$2`);

        const dir = path.join(ROOT, 'collections', c.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), sayfa, 'utf8');
        uretilenKategori++;
        console.log(`  collections/${c.slug}/`.padEnd(44) + `${String(urunler.length).padStart(3)} ürün`);
    }

    console.log(`\n${uretilenKategori} kategori sayfasi uretildi.\n`);

    /* --- urun sayfalari --- */
    let pdp = fs.readFileSync(PDP_SRC, 'utf8');
    pdp = rebase(pdp, up);

    let uretilenUrun = 0;
    for (const p of cat.prods) {
        const sayfa = urunSayfasi(p, cat, pdp, up);
        const dir = path.join(ROOT, 'urun', p.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), sayfa, 'utf8');
        uretilenUrun++;
    }
    console.log(`${uretilenUrun} urun sayfasi uretildi (urun/<slug>/).`);
}

main();
