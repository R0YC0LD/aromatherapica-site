/* ==========================================================================
   Aromatherapica - Kategori sayfasi ureticisi
   --------------------------------------------------------------------------
   Kaynak veri : data/catalog.json  (138 urun, 18 kategori - Ticimax katalogu)
   Sablon      : index.html  (yalnizca <main> icerigi degisir; header, footer,
                 stiller, yonetim paneli ve tum scriptler birebir korunur)
   Cikti       : collections/<slug>/index.html

   Kullanim:  node tools/build-categories.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'index.html');
const CATALOG = path.join(ROOT, 'data', 'catalog.json');

/* ------------------------------------------------------------- yardimcilar */

const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const tl = new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 2
});

/* Gorseli olmayan urunler icin ad/slug uzerinden icerik gorseli eslestirilir */
const INGREDIENTS = fs.existsSync(path.join(ROOT, 'images', 'ingredients'))
    ? fs.readdirSync(path.join(ROOT, 'images', 'ingredients'))
        .filter(f => f.endsWith('.svg'))
        .map(f => f.replace(/\.svg$/, ''))
    : [];

function productImage(p, up) {
    if (p.imageUrl) return { src: p.imageUrl, fit: 'cover', remote: true };
    const hay = (p.slug || '') + ' ' + (p.name || '').toLowerCase();
    // en uzun eslesme once denenir ("hindistan-cevizi" ile "hint" karismasin)
    const hit = INGREDIENTS
        .slice()
        .sort((a, b) => b.length - a.length)
        .find(ing => hay.includes(ing));
    if (hit) return { src: `${up}images/ingredients/${hit}.svg`, fit: 'contain', remote: false };
    return { src: `${up}images/product-placeholder.svg`, fit: 'contain', remote: false };
}

/* --------------------------------------------------------------- katalog */

function loadCatalog() {
    const d = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
    const cats = d.categories.filter(c => c.active !== false);
    const prods = d.products.filter(p => p.active !== false);

    const byId = new Map(cats.map(c => [c.id, c]));
    const children = id => cats.filter(c => c.parentId === id).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    const roots = cats.filter(c => !c.parentId || !byId.has(c.parentId)).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    // bir kategorinin kendi + alt kategorilerindeki urunler
    const descendantIds = id => {
        const out = [id];
        for (const ch of children(id)) out.push(...descendantIds(ch.id));
        return out;
    };
    const productsOf = id => {
        const ids = new Set(descendantIds(id));
        return prods.filter(p => ids.has(p.categoryId));
    };

    /* Bir kategorinin altindaki, dogrudan urunu olan yaprak kategoriler */
    const leaves = id => {
        const out = [];
        (function gez(pid) {
            for (const ch of children(pid)) {
                const kendi = prods.filter(p => p.categoryId === ch.id).length;
                if (kendi > 0) out.push(ch);
                gez(ch.id);
            }
        })(id);
        return out;
    };

    return { cats, prods, byId, children, roots, productsOf, leaves };
}

/* ------------------------------------------------------------- isaretleme */

function productCard(p, up) {
    const img = productImage(p, up);
    const indirim = p.salePrice && p.salePrice < p.price;
    const gosterilen = indirim ? p.salePrice : p.price;
    const stokta = p.stock > 0;

    return `
<li class="arp-card">
  <article class="arp-card__inner">
    <div class="arp-card__media">
      <img class="arp-card__img arp-card__img--${img.fit}" src="${esc(img.src)}" alt="${esc(p.name)}"${img.remote ? ' referrerpolicy="no-referrer"' : ''}>
      ${indirim ? '<span class="arp-card__badge">İndirim</span>' : ''}
      ${stokta ? '' : '<span class="arp-card__badge arp-card__badge--out">Tükendi</span>'}
    </div>
    <div class="arp-card__body">
      <p class="arp-card__cat">${esc(p.categoryName || '')}</p>
      <h2 class="arp-card__name">${esc(p.name)}</h2>
      ${p.shortDesc ? `<p class="arp-card__desc">${esc(String(p.shortDesc).slice(0, 110))}${String(p.shortDesc).length > 110 ? '…' : ''}</p>` : ''}
      <p class="arp-card__price">
        ${indirim ? `<span class="arp-card__old">${tl.format(p.price)}</span> ` : ''}
        <span class="arp-card__now">${tl.format(gosterilen)}</span>
      </p>
      <button type="button" class="arp-card__btn"${stokta ? '' : ' disabled'}>${stokta ? 'Sepete Ekle' : 'Tükendi'}</button>
    </div>
  </article>
</li>`;
}

function categoryMain(cat, products, subs, up) {
    const altMenu = subs.length
        ? `<nav class="arp-subnav" aria-label="Alt kategoriler">
             ${subs.map(s => `<a href="${up}collections/${esc(s.cat.slug)}/">${esc(s.cat.name)} <span>${s.count}</span></a>`).join('')}
           </nav>`
        : '';

    const list = products.length
        ? `<ul class="arp-grid">${products.map(p => productCard(p, up)).join('')}</ul>`
        : `<div class="arp-empty-cat">
             <p class="arp-empty-cat__title">Bu kategoride henüz ürün yok</p>
             <p class="arp-empty-cat__text">Ürün eklendiğinde burada listelenecek.</p>
             <a class="arp-empty-cat__btn" href="${up}">Ana sayfaya dön</a>
           </div>`;

    return `
<div class="arp-plp">
  <nav class="arp-crumbs" aria-label="Sayfa yolu">
    <a href="${up}">Ana Sayfa</a><span aria-hidden="true">/</span><span>${esc(cat.name)}</span>
  </nav>
  <header class="arp-plp__head">
    <h1 class="arp-plp__title">${esc(cat.name)}</h1>
    ${cat.seoDesc ? `<p class="arp-plp__desc">${esc(cat.seoDesc)}</p>` : ''}
    <p class="arp-plp__count">${products.length} ürün</p>
  </header>
  ${altMenu}
  ${list}
</div>`;
}

/* Kategori sayfalarina ozel stiller (sitenin renk/tipografi dilinde) */
const PLP_CSS = `
<style id="arp-plp-css">
.arp-plp{max-width:1440px;margin:0 auto;padding:2.5rem 1.5rem 5rem}
.arp-crumbs{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#6d7075;margin-bottom:1.75rem}
.arp-crumbs a{color:#6d7075;text-decoration:none}
.arp-crumbs a:hover{color:#45474a;text-decoration:underline}
.arp-crumbs span{margin:0 .5rem}
.arp-crumbs span:last-child{margin:0;color:#45474a}
.arp-plp__head{text-align:center;margin-bottom:2rem}
.arp-plp__title{font-family:"SainteColombeRegular","BrownRegular",Georgia,serif;font-size:2.6rem;line-height:1.15;color:#45474a;margin:0 0 .6rem}
.arp-plp__desc{font-size:1rem;color:#6d7075;margin:0 auto .6rem;max-width:640px;line-height:1.6}
.arp-plp__count{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#8b8e93;margin:0}
.arp-subnav{display:flex;flex-wrap:wrap;gap:.6rem;justify-content:center;margin:0 0 3rem}
.arp-subnav a{display:inline-flex;align-items:center;gap:.45rem;border:1px solid #dededa;border-radius:100px;
  padding:.5rem 1.1rem;font-size:.8rem;color:#45474a;text-decoration:none;transition:background .16s,border-color .16s}
.arp-subnav a:hover{background:#45474a;border-color:#45474a;color:#fff}
.arp-subnav a span{font-size:.7rem;color:#8b8e93}
.arp-subnav a:hover span{color:#d7d8da}
.arp-grid{list-style:none;margin:0;padding:0;display:grid;gap:2.5rem 1.5rem;grid-template-columns:repeat(4,1fr)}
@media (max-width:1100px){.arp-grid{grid-template-columns:repeat(3,1fr)}}
@media (max-width:820px){.arp-grid{grid-template-columns:repeat(2,1fr)}.arp-plp__title{font-size:2rem}}
@media (max-width:420px){.arp-grid{gap:2rem 1rem}}
.arp-card__inner{display:flex;flex-direction:column;height:100%}
.arp-card__media{position:relative;display:block;background:#f4f4f2;border-radius:4px;overflow:hidden;aspect-ratio:1/1}
.arp-card__img{width:100%;height:100%;display:block;transition:transform .35s ease}
.arp-card__img--cover{object-fit:cover}
.arp-card__img--contain{object-fit:contain;padding:16%}
.arp-card__media:hover .arp-card__img{transform:scale(1.04)}
.arp-card__badge{position:absolute;top:.6rem;left:.6rem;background:#45474a;color:#fff;font-size:.62rem;
  letter-spacing:.1em;text-transform:uppercase;padding:.28rem .55rem;border-radius:2px}
.arp-card__badge--out{background:#8b8e93}
.arp-card__body{padding-top:1rem;display:flex;flex-direction:column;flex:1 1 auto}
.arp-card__cat{font-size:.66rem;letter-spacing:.09em;text-transform:uppercase;color:#8b8e93;margin:0 0 .4rem}
.arp-card__name{font-size:.95rem;line-height:1.35;font-weight:400;margin:0 0 .45rem;color:#45474a}
.arp-card__desc{font-size:.78rem;line-height:1.5;color:#6d7075;margin:0 0 .6rem}
.arp-card__price{margin:0 0 .9rem;font-size:.98rem;color:#45474a}
.arp-card__old{text-decoration:line-through;color:#a3a6aa;font-size:.85rem;margin-right:.25rem}
.arp-card__now{font-weight:500}
.arp-card__btn{margin-top:auto;width:100%;background:#45474a;color:#fff;border:1px solid #45474a;border-radius:2px;
  padding:.7rem 1rem;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .18s,color .18s}
.arp-card__btn:hover:not([disabled]){background:#fff;color:#45474a}
.arp-card__btn[disabled]{background:#d7d8da;border-color:#d7d8da;color:#fff;cursor:not-allowed}
.arp-empty-cat{text-align:center;padding:4rem 1rem 6rem}
.arp-empty-cat__title{font-family:"SainteColombeRegular","BrownRegular",Georgia,serif;font-size:1.7rem;color:#45474a;margin:0 0 .6rem}
.arp-empty-cat__text{color:#6d7075;margin:0 0 1.6rem}
.arp-empty-cat__btn{display:inline-block;background:#45474a;color:#fff;text-decoration:none;padding:.8rem 2rem;
  border-radius:2px;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}
.arp-empty-cat__btn:hover{opacity:.85}
</style>`;

/* --------------------------------------------------------------- donusum */

function rebase(html, up) {
    if (!up) return html;
    html = html.replace(/(\s(?:href|src|data-src)=")((?:css|js|images|media|fonts|data)\/)/g, `$1${up}$2`);
    html = html.replace(/(url\(\s*["']?)((?:images|fonts)\/)/g, `$1${up}$2`);
    return html;
}

/* Yalnizca <a> etiketleri islenir; yerel karsiligi olmayan ic yollar ana
   sayfaya dusurulur ki hicbir tiklama 404 vermesin. Idempotenttir. */
function rewriteLinks(html, up, slugs) {
    const home = up || './';
    const decide = (raw) => {
        const v = String(raw).trim();
        if (v === '' || /^(#|mailto:|tel:|javascript:|data:)/i.test(v)) return null;
        let p = v.replace(/^https?:\/\/(?:www\.)?aromatherapica\.com/i, '');
        if (/^https?:\/\//i.test(p) || /^\/\//.test(p)) return null;
        const norm = p.replace(/^(?:\.\.\/|\/)+/, '');
        if (norm === '') return home;
        const cm = norm.match(/^collections\/([a-z0-9-]+)\/?$/i);
        if (cm && slugs.has(cm[1].toLowerCase())) return `${up}collections/${cm[1].toLowerCase()}/`;
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

/* --------------------------------------------------------- menu yazimi */

/* Ic ice <ul> sayarak eslesen kapanis etiketini bulur */
function matchingClose(html, openIdx, tag) {
    const open = new RegExp(`<${tag}\\b`, 'gi');
    const close = new RegExp(`</${tag}>`, 'gi');
    let depth = 0, i = openIdx;
    while (i < html.length) {
        open.lastIndex = i; close.lastIndex = i;
        const o = open.exec(html); const c = close.exec(html);
        if (!c) return -1;
        if (o && o.index < c.index) { depth++; i = o.index + 1; }
        else { depth--; if (depth === 0) return c.index; i = c.index + 1; }
    }
    return -1;
}

/* Magaza menusunu gercek kategori agacina gore yeniden kurar.
   Sitenin kendi sinif/veri-oznitelik desenleri korunur ki menu JS'i calissin. */
function rewriteShopNav(html, cat, up) {
    const anchor = '<ul class="products-allproducts-list-container nav-list">';
    const s = html.indexOf(anchor);
    if (s < 0) return html;
    const ulStart = s;
    const end = matchingClose(html, ulStart, 'ul');
    if (end < 0) return html;

    const items = cat.roots.map(root => {
        /* Katalog uc seviyeli; site menusu ise iki seviye gosterir.
           Ara gruplari ("Urune Gore ...") atlayip dogrudan urunu olan
           yaprak kategorileri listeleriz - menu hem kisa hem kullanisli olur. */
        const subs = cat.leaves(root.id);
        const id = `navItem-${root.slug}`;
        const href = `${up}collections/${root.slug}/`;

        if (!subs.length) {
            return `
<li class="second-level-menu">
<a id="${esc(id)}" class="cat-level-2 no-more-child" data-collection="${esc(root.slug)}" href="${esc(href)}">
<span class="category-name-text">${esc(root.name)}</span>
</a>
</li>`;
        }

        const kids = subs.map(s2 => `
<li class="third-level-menu">
<a href="${esc(`${up}collections/${s2.slug}/`)}" id="navItem-${esc(s2.slug)}" data-collection="${esc(s2.slug)}" class="third-level-cat-link"> <span>${esc(s2.name)}</span> </a>
</li>`).join('');

        return `
<li class="second-level-menu">
<a id="${esc(id)}" class="cat-level-2 de-third-parent" data-collection="${esc(root.slug)}" data-related-submenu="${esc(root.name)}" data-tapped="false" aria-expanded="false" role="button" href="${esc(href)}">
<span class="category-name-text">${esc(root.name)}</span>
<span class="svg-icon greater-than-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
        <path d="M0.5 0.5L4 4L0.5 7.5" stroke="#45474A" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</span>
</a>
<ul class="levelthree-categories">
<div class="subcat-level3-container" data-expanded="false" data-submenu="${esc(root.name)}">
${kids}
</div>
</ul>
</li>`;
    }).join('');

    const block = `${anchor}
<div class="de-submenu">
${items}
</div>
</ul>`;

    return html.slice(0, ulStart) + block + html.slice(end + 5);
}

/* ------------------------------------------------------------------ ana */

function main() {
    const src = fs.readFileSync(SRC, 'utf8');
    const cat = loadCatalog();
    const slugs = new Set(cat.cats.map(c => c.slug));

    const ms = src.indexOf('<main id="main"');
    const mo = src.indexOf('>', ms) + 1;
    const me = src.lastIndexOf('</main>');
    if (ms < 0 || me < 0) throw new Error('<main> siniri bulunamadi');

    const head = src.slice(0, mo);
    const tail = src.slice(me);
    const up = '../../';

    const headR = rewriteLinks(rewriteShopNav(rebase(head, up), cat, up), up, slugs);
    const tailR = rewriteLinks(rebase(tail, up), up, slugs);

    let toplam = 0;
    for (const c of cat.cats) {
        const products = cat.productsOf(c.id);
        // Ara gruplarin altindaki yaprak kategorileri goster ki gezinme kolay olsun
        const subs = cat.leaves(c.id).map(s => ({ cat: s, count: cat.productsOf(s.id).length }));

        let page = headR + categoryMain(c, products, subs, up) + tailR;
        page = page.replace(/<title>[^<]*<\/title>/,
            `<title>${esc(c.name)} | Aromatherapica</title>`);
        page = page.replace(/(<meta name="description" content=")[^"]*(")/,
            `$1${esc(c.seoDesc || `${c.name} kategorisindeki doğal Aromatherapica ürünleri.`)}$2`);
        page = page.replace('</head>', PLP_CSS + '\n</head>');

        const dir = path.join(ROOT, 'collections', c.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), page, 'utf8');
        console.log(`  collections/${c.slug}/`.padEnd(42) + `${String(products.length).padStart(3)} ürün`);
        toplam++;
    }

    // Ana sayfanin menusunu ve linklerini de gercek kategorilere bagla
    const rootOut = rewriteLinks(rewriteShopNav(src, cat, ''), '', slugs);
    if (rootOut !== src) {
        fs.writeFileSync(SRC, rootOut, 'utf8');
        console.log('\nindex.html menusu ve linkleri guncellendi.');
    } else {
        console.log('\nindex.html zaten guncel.');
    }
    console.log(`${toplam} kategori sayfasi uretildi.`);
}

main();
