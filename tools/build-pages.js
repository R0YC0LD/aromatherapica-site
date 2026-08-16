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

/* Gorseli olmayan urunler icin notr bir yer tutucu kullanilir.
   Onceden images/ingredients/*.svg deneniyordu; bunlar dekoratif icerik
   illustrasyonlari (uzerinde "Hi" gibi etiketler var) ve urun gorseli
   yerine konunca kotu duruyordu. Gercek fotograflar eklenene kadar
   sade bir sise silueti daha temiz. */
function urunGorseli(p, up) {
    return p.imageUrl || `${up}images/product-placeholder.svg`;
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
    /* data-arp-* oznitelikleri js/arp-store.js tarafindan siralama ve
       sepete ekleme icin kullanilir. */
    return `
<div class="product-card">
<div class="js-product-card de-product-card redesign-product-card de-featured-life-item loaded" data-trigger="scroll" aria-labelledby="product-id-${id}" id="card-${id}" role="group"
 data-arp-id="${id}" data-arp-slug="${esc(p.slug)}" data-arp-isim="${esc(p.name)}" data-arp-fiyat="${fiyat}" data-arp-gorsel="${esc(gorsel)}">
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
<div class="de-inner arp-kart-butonlar">
<a class="arp-plp-cta" href="${esc(urunYolu(p, up))}">İncele</a>
${p.stock > 0
            ? '<button type="button" class="arp-plp-cta" data-arp-ekle>Sepete Ekle</button>'
            : '<button type="button" class="arp-plp-cta" disabled>Tükendi</button>'}
</div>
</div>
</div>
</div>
</div>
</div>`;
}

/* Sol kenardaki kategori filtreleri.
   Sablonun KENDI isaretlemesi (refinement-header, category-filters-wrapper,
   filter-pills) birebir korunur; yalnizca kategoriler bizimkilerle degisir.
   Boylece search.bundle.css'ten gelen gorunum aynen kalir. */
function filtreListesi(cat, aktif, up) {
    // Aktif kategorinin bagli oldugu ust kategori acik gosterilir
    const yol = cat.yol(aktif.id);
    const aktifKok = yol[0] || aktif;

    const kokler = cat.roots.map(r => {
        const acik = r.id === aktifKok.id;
        const yapraklar = cat.leaves(r.id);
        const kokHref = esc(`${up}collections/${r.slug}/`);

        const piller = yapraklar.map(c => {
            const secili = c.id === aktif.id;
            return `				<li class="category-filters">
						<a href="${esc(`${up}collections/${c.slug}/`)}" role="switch" aria-checked="${secili}" class="${secili ? 'active ' : ' '}filter-pills" data-cgid="${esc(c.slug)}">
							${esc(c.name)}
						</a>
				</li>`;
        }).join('\n');

        const altListe = yapraklar.length ? `
	<ul class="category-filters-wrapper filter-level-two" data-cgid="${esc(r.slug)}">
					<button class="filter-pills default-filter${aktif.id === r.id ? ' active' : ''}" aria-checked="${aktif.id === r.id}" data-cgid="${esc(r.slug)}" data-href="${kokHref}" role="switch" onclick="location.href='${kokHref}'">TÜMÜ</button>
${piller}
	</ul>` : '';

        return `				<li class="category-filters${acik ? ' active expanded' : ''} level-one">
						<a href="${kokHref}" title="${esc(r.name)}" class="${acik ? ' active ' : ' '}refinement-link js-product-trigger" data-cgid="${esc(r.slug)}">
							${esc(r.name)}
						</a>${altListe}
				</li>`;
    }).join('\n');

    return `
<section class="refinement-header">
<div class="title">Kategoriler</div>
</section>
	<ul class="category-filters-wrapper filter-level-one" data-cgid="tum-urunler">
${kokler}
	</ul>`;
}

/* Siralama: sablonun stilli select'i (#grid-sort-header) korunur,
   yalnizca secenekleri Turkcelestirilip js/arp-store.js'e baglanir. */
const SIRALAMA_SECENEKLERI = `
<option value="onerilen" selected="">Sırala: Önerilen</option>
<option value="fiyat-artan">Fiyat: Düşükten yükseğe</option>
<option value="fiyat-azalan">Fiyat: Yüksekten düşüğe</option>
<option value="isim-az">İsim: A–Z</option>
<option value="isim-za">İsim: Z–A</option>`;

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
    // sablonun tanitim videolari projede yok; urun gorseliyle degistirilir
    s = s.replace(/(?:\.\.\/\.\.\/)?media\/[A-Za-z0-9._-]+\.(?:mp4|webm|mov)/g, gorsel);

    // 4) pazarlama metni ve aciklama
    if (p.shortDesc) s = s.split(PDP_ORNEK.pazarlama).join(p.shortDesc);

    // 5) baslik ve aciklama
    s = s.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.name)} | Aromatherapica</title>`);
    s = s.replace(/(<meta name="description" content=")[^"]*(")/,
        `$1${esc((p.seoDesc || p.shortDesc || p.name).slice(0, 300))}$2`);

    // 6) sepete ekleme: urun verisi + adet secici, sablonun butonu kullanilir
    const indirimliFiyat = indirim ? p.salePrice : p.price;
    const veri = {
        id: String(p.id), slug: p.slug, name: p.name,
        price: indirimliFiyat, image: gorsel
    };
    s = s.replace('</body>',
        `<script type="application/json" id="arp-urun">${JSON.stringify(veri)
            .replace(/</g, '\\u003c')}</script>\n</body>`);

    // sablondaki sepete ekle butonunu kendi islevimize bagla
    s = s.replace(/(<button[^>]*id="add-to-cart"[^>]*)>/i,
        (m, bas) => `${bas.replace(/\sdata-arp-ekle/g, '')} data-arp-ekle>`);
    // adet secici, butonun hemen oncesine
    s = s.replace(/(<button[^>]*id="add-to-cart")/i,
        `<div class="arp-adet-sar"><label for="arp-adet">Adet</label>` +
        `<input type="number" id="arp-adet" min="1" value="1"></div>$1`);

    /* 7) Urun aciklamasi: sablonun pazarlama bolumleri kaldirildigi icin
       urunun kendi Turkce aciklamasini kendi bolumumuzde gosteriyoruz. */
    if (p.description) {
        const paragraflar = String(p.description)
            .split(/\n+/).map(t => t.trim()).filter(Boolean)
            .map(t => `<p>${esc(t)}</p>`).join('');
        const bolum = `
<section class="arp-urun-aciklama">
  <div class="arp-urun-aciklama__ic">
    <h2>Ürün Açıklaması</h2>
    ${paragraflar}
    <dl class="arp-urun-kunye">
      ${p.brandName ? `<div><dt>Marka</dt><dd>${esc(p.brandName)}</dd></div>` : ''}
      <div><dt>Kategori</dt><dd>${esc(p.categoryName || '')}</dd></div>
      ${p.sku ? `<div><dt>Stok kodu</dt><dd>${esc(p.sku)}</dd></div>` : ''}
      <div><dt>Durum</dt><dd>${p.stock > 0 ? 'Stokta' : 'Tükendi'}</dd></div>
    </dl>
  </div>
</section>`;
        s = s.replace('</main>', bolum + '\n</main>');
        if (!s.includes('arp-urun-aciklama')) {
            // <main> yoksa footer oncesine ekle
            s = s.replace('<footer', bolum + '\n<footer');
        }
    }

    // 8) ekmek kirintisi: kategori yolu
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

        // 2) sol kenar: kategori filtreleri (sablonun isaretlemesi korunur)
        sayfa = icerikDegistir(sayfa, 'refinement-content refinement-wrapper',
            filtreListesi(cat, c, up));

        /* 3) Siralama: sablonun stilli select'i korunur ama id'si degistirilir.
           product-list.js "#grid-sort-header" change olayina baglanip calismayan
           Demandware AJAX'ini tetikliyordu; gorunumu veren siniflar kaldigi icin
           id degisimi tasarimi etkilemez (CSS id'ye bakmiyor). */
        sayfa = sayfa.replace(
            /<select id="grid-sort-header"([^>]*)>[\s\S]*?<\/select>/,
            `<select id="arp-siralama"$1>${SIRALAMA_SECENEKLERI}\n</select>`);

        // 4) mobil filtre sekmesindeki kategori adi
        sayfa = sayfa.replace(
            /(<button class="refinement-tab category"[^>]*>\s*<span class="tab-name">)[^<]*(<\/span>)/,
            `$1${esc(c.name)}$2`);
        sayfa = sayfa.replace(
            /(<button class="refinement-tab sort"[^>]*>\s*<span class="tab-name">)[^<]*(<\/span>)/,
            '$1Sırala$2');

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

    /* --- sepet sayfasi --- */
    const CART_SRC = path.join(ROOT, 'site sepet sekmesi referans', 'index.html');
    if (fs.existsSync(CART_SRC)) {
        const cartUp = '../';
        let cart = rebase(fs.readFileSync(CART_SRC, 'utf8'), cartUp);

        // Bos sepet kabugu korunur; dolu durum js/arp-store.js tarafindan cizilir
        cart = icerikDegistir(cart, 'column small-12 cart-header-container de-cart-empty-container',
            `<h1 class="shopping-bag">sepetim (0)</h1>
<div id="arp-sepet"></div>
<div class="de-empty-cart">
<h1 class="de-cart-title de-empty-cart-title">Sepetiniz boş</h1>
<a href="${cartUp}" class="de-cart-return"><span>Alışverişe başla</span></a>
</div>`);

        cart = cart.replace(/<title>[^<]*<\/title>/, '<title>Sepetim | Aromatherapica</title>');
        cart = cart.replace(/(<meta name="description" content=")[^"]*(")/,
            '$1Aromatherapica alışveriş sepetiniz.$2');

        const dir = path.join(ROOT, 'sepet');
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), cart, 'utf8');
        console.log('1 sepet sayfasi uretildi (sepet/).');
    } else {
        console.log('UYARI: sepet sablonu bulunamadi, sepet sayfasi uretilmedi.');
    }
}

main();
