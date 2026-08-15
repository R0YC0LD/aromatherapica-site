/* ==========================================================================
   Aromatherapica - Kategori sayfasi ureticisi
   --------------------------------------------------------------------------
   index.html sablon olarak kullanilir: yalnizca <main> icerigi degistirilir,
   boylece header, footer, stiller, yonetim paneli ve tum scriptler birebir
   korunur. Goreli varlik yollari sayfa derinligine gore duzeltilir.

   Kullanim:  node tools/build-categories.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');

/* ------------------------------------------------------------------ veri */

/* Urunler index.html icindeki urun onbelleginden okunur */
function readProducts(html) {
    const i = html.indexOf('homepagesectiontwoProductCache_1');
    if (i < 0) throw new Error('Urun onbellegi bulunamadi');
    const s = html.indexOf('{', i);
    let depth = 0, e = s;
    for (; e < html.length; e++) {
        if (html[e] === '{') depth++;
        else if (html[e] === '}') { depth--; if (depth === 0) { e++; break; } }
    }
    return JSON.parse(html.slice(s, e)).product || [];
}

/* Urun gorselleri depoda yerel olarak duruyor; id uzerinden eslestiriyoruz */
const IMAGES = {
    '812343032064': { main: 'images/D-bronzi.png', hover: 'images/dotcom-plp-hover_d-bronzi-812343032064.jpg' },
    '856556004180': { main: 'images/B-Hydra.png', hover: 'images/dotcom-plp-hover_b-hydra-856556004180.jpg' },
    '999DE00000103': { main: 'images/Protini-Cream.png', hover: 'images/dotcom-plp-hover_protini-999DE00000103.jpg' },
    '812343034358': { main: 'images/C-Firma.png', hover: 'images/dotcom-plp-hover_c-firma-812343034358.jpg' },
    '999DE00000104': { main: 'images/TLC-Framboos.png', hover: 'images/dotcom-plp-hover_Framboos-999DE00000104.jpg' },
    '999DE00000100': { main: 'images/A-Passioni.png', hover: 'images/dotcom-plp-hover_A-Pass-999DE00000100.jpg' }
};

/* Uretilecek kategoriler. filter -> urun secici, bos kategoriler de sayfa alir
   ki menudeki hicbir link 404 vermesin. */
const CATEGORIES = [
    { slug: 'best-sellers', title: 'Best Sellers', desc: 'En cok tercih edilen formuller.', filter: () => true },
    { slug: 'skincare', title: 'Skincare', desc: 'Cilt bakim koleksiyonunun tamami.', filter: p => p.subCategory === 'Skincare' },
    { slug: 'serums', title: 'Serums', desc: 'Yogun bakim serumleri.', filter: p => p.subSubCategory === 'Serums' },
    { slug: 'moisturizers', title: 'Moisturizers', desc: 'Nemlendiriciler.', filter: p => p.subSubCategory === 'Moisturizers' },
    { slug: 'masks-treatments', title: 'Masks + Treatments', desc: 'Maskeler ve yogun bakim urunleri.', filter: p => p.subSubCategory === 'Masks + Treatments' },
    { slug: 'clinical-color', title: 'Clinical Color', desc: 'Renkli bakim urunleri.', filter: () => false },
    { slug: 'hair-collection', title: 'Hair Care', desc: 'Sac bakim koleksiyonu.', filter: () => false },
    { slug: 'body-collection', title: 'Body Care', desc: 'Vucut bakim koleksiyonu.', filter: () => false },
    { slug: 'kits-bundles', title: 'Kits & Bundles', desc: 'Setler ve avantajli paketler.', filter: () => false },
    { slug: 'merch', title: 'Aromatherapica Merch', desc: 'Marka urunleri.', filter: () => false }
];

/* ------------------------------------------------------------- yardimcilar */

const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function stars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    let out = '';
    for (let i = 0; i < 5; i++) {
        out += `<span class="arp-star${i < full ? ' is-full' : (i === full && half ? ' is-half' : '')}" aria-hidden="true">&#9733;</span>`;
    }
    return out;
}

/* ------------------------------------------------------------- isaretleme */

function productCard(p, up) {
    const img = IMAGES[p.id] || {};
    const main = img.main ? up + img.main : '';
    const hover = img.hover ? up + img.hover : '';
    const sub = p.subSubCategory || p.subCategory || '';
    const size = p.customSize && p.customSize.length < 40 ? p.customSize : '';

    return `
<li class="arp-card">
  <article class="arp-card__inner">
    <a class="arp-card__media" href="#" aria-label="${esc(p.name)}">
      <img class="arp-card__img" src="${esc(main)}" alt="${esc(p.name)}">
      ${hover ? `<img class="arp-card__img arp-card__img--hover" src="${esc(hover)}" alt="" aria-hidden="true">` : ''}
    </a>
    <div class="arp-card__body">
      ${sub ? `<p class="arp-card__cat">${esc(sub)}</p>` : ''}
      <h2 class="arp-card__name"><a href="#">${esc(p.name)}</a></h2>
      <p class="arp-card__rating">
        ${stars(p.productStarRating || 0)}
        <span class="arp-card__count">(${p.productNumReviews || 0})</span>
      </p>
      ${size ? `<p class="arp-card__size">${esc(size)}</p>` : ''}
      <p class="arp-card__price">$${Number(p.price).toFixed(2)}</p>
      <button type="button" class="arp-card__btn">Add to Bag</button>
    </div>
  </article>
</li>`;
}

function categoryMain(cat, products, up) {
    const list = products.length
        ? `<ul class="arp-grid">${products.map(p => productCard(p, up)).join('')}</ul>`
        : `<div class="arp-empty-cat">
             <p class="arp-empty-cat__title">Bu koleksiyon yakinda</p>
             <p class="arp-empty-cat__text">Bu kategoriye urun eklendiginde burada listelenecek.</p>
             <a class="arp-empty-cat__btn" href="${up}collections/best-sellers/">Best Sellers'a goz atin</a>
           </div>`;

    return `
<div class="arp-plp">
  <nav class="arp-crumbs" aria-label="Breadcrumb">
    <a href="${up}">Home</a><span aria-hidden="true">/</span><span>${esc(cat.title)}</span>
  </nav>
  <header class="arp-plp__head">
    <h1 class="arp-plp__title">${esc(cat.title)}</h1>
    <p class="arp-plp__desc">${esc(cat.desc)}</p>
    <p class="arp-plp__count">${products.length} urun</p>
  </header>
  ${list}
</div>`;
}

/* Kategori sayfalarinda kullanilan ek stiller (sitenin kendi degiskenleriyle) */
const PLP_CSS = `
<style id="arp-plp-css">
.arp-plp{max-width:1440px;margin:0 auto;padding:2.5rem 1.5rem 5rem}
.arp-crumbs{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#6d7075;margin-bottom:1.75rem}
.arp-crumbs a{color:#6d7075;text-decoration:none}
.arp-crumbs a:hover{color:#45474a;text-decoration:underline}
.arp-crumbs span{margin:0 .5rem}
.arp-crumbs span:last-child{margin:0;color:#45474a}
.arp-plp__head{text-align:center;margin-bottom:3rem}
.arp-plp__title{font-family:"SainteColombeRegular","BrownRegular",Georgia,serif;font-size:2.6rem;line-height:1.15;color:#45474a;margin:0 0 .6rem}
.arp-plp__desc{font-size:1rem;color:#6d7075;margin:0 0 .5rem}
.arp-plp__count{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#8b8e93;margin:0}
.arp-grid{list-style:none;margin:0;padding:0;display:grid;gap:2.5rem 1.5rem;grid-template-columns:repeat(4,1fr)}
@media (max-width:1100px){.arp-grid{grid-template-columns:repeat(3,1fr)}}
@media (max-width:820px){.arp-grid{grid-template-columns:repeat(2,1fr)}.arp-plp__title{font-size:2rem}}
@media (max-width:420px){.arp-grid{gap:2rem 1rem}}
.arp-card__inner{display:flex;flex-direction:column;height:100%}
.arp-card__media{position:relative;display:block;background:#f4f4f2;border-radius:4px;overflow:hidden;aspect-ratio:1/1}
.arp-card__img{width:100%;height:100%;object-fit:contain;padding:12%;transition:opacity .3s ease}
.arp-card__img--hover{position:absolute;inset:0;opacity:0;object-fit:cover;padding:0}
.arp-card__media:hover .arp-card__img--hover{opacity:1}
.arp-card__body{padding-top:1rem;display:flex;flex-direction:column;flex:1 1 auto}
.arp-card__cat{font-size:.68rem;letter-spacing:.09em;text-transform:uppercase;color:#8b8e93;margin:0 0 .4rem}
.arp-card__name{font-size:.95rem;line-height:1.35;font-weight:400;margin:0 0 .5rem;color:#45474a}
.arp-card__name a{color:inherit;text-decoration:none}
.arp-card__name a:hover{text-decoration:underline}
.arp-card__rating{margin:0 0 .35rem;font-size:.8rem;color:#45474a;display:flex;align-items:center;gap:.35rem}
.arp-star{color:#d7d8da;font-size:.85rem;line-height:1}
.arp-star.is-full,.arp-star.is-half{color:#45474a}
.arp-card__count{color:#8b8e93;font-size:.72rem}
.arp-card__size{font-size:.72rem;color:#8b8e93;margin:0 0 .35rem}
.arp-card__price{font-size:.95rem;color:#45474a;margin:0 0 .9rem;font-weight:500}
.arp-card__btn{margin-top:auto;width:100%;background:#45474a;color:#fff;border:1px solid #45474a;border-radius:2px;
  padding:.7rem 1rem;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .18s,color .18s}
.arp-card__btn:hover{background:#fff;color:#45474a}
.arp-empty-cat{text-align:center;padding:4rem 1rem 6rem}
.arp-empty-cat__title{font-family:"SainteColombeRegular","BrownRegular",Georgia,serif;font-size:1.7rem;color:#45474a;margin:0 0 .6rem}
.arp-empty-cat__text{color:#6d7075;margin:0 0 1.6rem}
.arp-empty-cat__btn{display:inline-block;background:#45474a;color:#fff;text-decoration:none;padding:.8rem 2rem;
  border-radius:2px;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}
.arp-empty-cat__btn:hover{opacity:.85}
</style>`;

/* --------------------------------------------------------------- donusum */

/* Goreli varlik yollarini sayfa derinligine gore duzelt */
function rebase(html, up) {
    if (!up) return html;
    html = html.replace(/(\s(?:href|src|data-src)=")((?:css|js|images|media|fonts)\/)/g, `$1${up}$2`);
    html = html.replace(/(url\(\s*["']?)((?:images|fonts)\/)/g, `$1${up}$2`);
    return html;
}

/* Menu ve footer linklerini uretilen yerel sayfalara baglar.
   Yalnizca <a> etiketleri islenir (stylesheet/script href'lerine dokunulmaz).
   Karsiligi olmayan tum ic yollar ana sayfaya dusurulur ki hicbir tiklama
   404 vermesin. Tekrar calistirildiginda ayni sonucu verir (idempotent). */
function rewriteLinks(html, up, slugs) {
    const home = up || './';

    const decide = (raw) => {
        const v = String(raw).trim();

        // Sayfa ici capalar ve ozel semalar oldugu gibi kalir
        if (v === '' || /^(#|mailto:|tel:|javascript:|data:)/i.test(v)) return null;

        // Magaza alan adini soy
        let p = v.replace(/^https?:\/\/(?:www\.)?aromatherapica\.com/i, '');

        // Baska bir dis siteye gidiyorsa dokunma (sosyal medya, Google vb.)
        if (/^https?:\/\//i.test(p) || /^\/\//.test(p)) return null;

        // Bastaki "/" ve "../" yiginlarini temizle (onceki uretimlerden kalanlar dahil)
        const norm = p.replace(/^(?:\.\.\/|\/)+/, '');

        if (norm === '') return home;

        const cm = norm.match(/^collections\/([a-z0-9-]+)\/?$/i);
        if (cm && slugs.has(cm[1].toLowerCase())) {
            return `${up}collections/${cm[1].toLowerCase()}/`;
        }

        // Yerel karsiligi olmayan ic yollar
        return home;
    };

    return html.replace(/<a\s([^>]*?)>/gi, (tag, attrs) => {
        const out = attrs.replace(/(href=")([^"]*)(")/i, (m, a, val, b) => {
            const next = decide(val);
            return next === null ? m : a + next + b;
        });
        return `<a ${out}>`;
    });
}

/* ------------------------------------------------------------------ ana */

function main() {
    const src = fs.readFileSync(SRC, 'utf8');
    const products = readProducts(src);
    const slugs = new Set(CATEGORIES.map(c => c.slug));

    const ms = src.indexOf('<main id="main"');
    const mo = src.indexOf('>', ms) + 1;
    const me = src.lastIndexOf('</main>');
    if (ms < 0 || me < 0) throw new Error('<main> siniri bulunamadi');

    const head = src.slice(0, mo);
    const tail = src.slice(me);
    const up = '../../';

    let built = 0;
    for (const cat of CATEGORIES) {
        const list = products.filter(cat.filter);
        // link duzeltmesi yalnizca sablon parcalarina uygulanir; uretilen
        // <main> icerigi zaten dogru derinlikte yazilmistir
        const headR = rewriteLinks(rebase(head, up), up, slugs);
        const tailR = rewriteLinks(rebase(tail, up), up, slugs);
        let page = headR + categoryMain(cat, list, up) + tailR;

        // sayfa basligi ve aciklamasi
        page = page.replace(/<title>[^<]*<\/title>/,
            `<title>${esc(cat.title)} | Aromatherapica</title>`);
        page = page.replace(/(<meta name="description" content=")[^"]*(")/,
            `$1${esc(cat.desc)}$2`);
        // liste stillerini ekle
        page = page.replace('</head>', PLP_CSS + '\n</head>');

        const dir = path.join(ROOT, 'collections', cat.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), page, 'utf8');
        console.log(`  collections/${cat.slug}/`.padEnd(38) + `${list.length} urun`);
        built++;
    }
    // Ana sayfadaki menu/footer linklerini de yerel kategorilere bagla
    const rootOut = rewriteLinks(src, '', slugs);
    if (rootOut !== src) {
        fs.writeFileSync(SRC, rootOut, 'utf8');
        console.log('\nindex.html menu linkleri yerel kategorilere baglandi.');
    } else {
        console.log('\nindex.html linkleri zaten guncel.');
    }

    console.log(`${built} kategori sayfasi uretildi.`);
}

main();
