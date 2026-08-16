/* ==========================================================================
   Aromatherapica - Turkcelestirme
   --------------------------------------------------------------------------
   Tum HTML dosyalarindaki kullaniciya gorunen Ingilizce metinleri Turkcelestirir.
   Yalnizca metin dugumleri ve kullaniciya gorunen oznitelikler (alt, title,
   aria-label, placeholder, value) islenir; sinif adlari, ID'ler, veri
   oznitelikleri ve adresler korunur.

   Eslesme tam metin uzerinedir (kismi kelime bozulmasi olmaz).
   Tekrar calistirilabilir: cevrilmis metin sozlukte bulunmaz, degismeden kalir.

   Kullanim:  node tools/translate.js
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* ------------------------------------------------------------------ sozluk */

const DICT = {
    // --- ust seviye gezinme ---
    'Shop': 'Mağaza',
    'Learn': 'Keşfet',
    'Stores': 'Mağazalar',
    'Search': 'Ara',
    'search': 'ara',
    'Close': 'Kapat',
    'Sign In/Register': 'Giriş Yap / Üye Ol',
    'Sign Up': 'Kayıt Ol',
    'Subscribe': 'Abone Ol',
    'Subscribe to save': 'Abone ol, kazan',

    // --- kesfet menusu ---
    'Find Your Routine': 'Bakım Rutinini Bul',
    'Kamo Shade Finder': 'Ton Bulucu',
    'Philosophy': 'Felsefemiz',
    'Smoothie Glossary': 'Karışım Rehberi',
    'Aromatherapica Glossary': 'Aromatherapica Sözlüğü',
    'FAQ': 'Sıkça Sorulan Sorular',
    'The Aromatherapica Mag': 'Aromatherapica Blog',
    'Contact': 'İletişim',
    'Contact Us': 'Bize Ulaşın',
    'Our Guide to Vitamin C': 'C Vitamini Rehberi',
    'The Moisturizer Edit': 'Nemlendirici Seçkisi',
    'The OG Color Serum Drops': 'Renkli Serum Damlaları',
    'Find Your Hydrating Serum': 'Nemlendirici Serumunu Bul',

    // --- alisveris ---
    'Add to Bag': 'Sepete Ekle',
    'Shop Now': 'Hemen Al',
    'Shop Bestsellers': 'Çok Satanları İncele',
    'SHOP ALL SKIN CARE': 'TÜM CİLT BAKIMINI İNCELE',
    'Best Sellers': 'Çok Satanlar',
    'Bestsellers': 'Çok Satanlar',
    'Gifts': 'Hediyeler',
    'Kits & Bundles': 'Setler ve Paketler',
    'Kits &amp; Bundles': 'Setler ve Paketler',
    'Aromatherapica Merch': 'Aromatherapica Ürünleri',
    'Gift Card': 'Hediye Kartı',
    'Check Gift Card Balance': 'Hediye Kartı Bakiyesi',
    'Quantity of items in cart is': 'Sepetteki ürün adedi',

    // --- kategori adlari (eski sablondan kalanlar) ---
    'Skincare': 'Cilt Bakımı',
    'Hair Care': 'Saç Bakımı',
    'Body Care': 'Vücut Bakımı',
    'Clinical Color': 'Renkli Bakım',
    'Cleansers': 'Temizleyiciler',
    'Conditioners': 'Saç Kremleri',
    'Shampoos': 'Şampuanlar',
    'Deodorants': 'Deodorantlar',
    'Lotions': 'Losyonlar',
    'Serums': 'Serumlar',
    'Serum': 'Serum',
    'Moisturizers': 'Nemlendiriciler',
    'Moisturizer': 'Nemlendirici',
    'Treatments': 'Bakım Ürünleri',
    'Treatment': 'Bakım Ürünü',
    'Masks + Treatments': 'Maskeler ve Bakım',
    'Exfoliants + Scrubs': 'Peelingler',
    'Eyes + Lips': 'Göz ve Dudak',
    'Sun Protection': 'Güneş Koruma',
    'Leave-in + Styling': 'Şekillendiriciler',
    'Travel': 'Seyahat Boyu',

    // --- footer ---
    'Connect': 'Bize Ulaşın',
    'Misc': 'Diğer',
    'Our Story': 'Hikâyemiz',
    'Careers': 'Kariyer',
    'Press': 'Basın',
    'Discounts': 'İndirimler',
    'Community Discounts': 'Topluluk İndirimleri',
    'Student': 'Öğrenci',
    'Teacher': 'Öğretmen',
    'Military': 'Asker',
    'First Responder': 'Acil Yardım Görevlisi',
    'Medical Professional': 'Sağlık Çalışanı',
    'Shipping & Returns': 'Kargo ve İade',
    'Shipping &amp; Returns': 'Kargo ve İade',
    'Terms & Conditions': 'Kullanım Koşulları',
    'Terms &amp; Conditions': 'Kullanım Koşulları',
    'Terms of Service': 'Hizmet Şartları',
    'Privacy Policy': 'Gizlilik Politikası',
    'SMS Terms and Conditions': 'SMS Kullanım Koşulları',
    'Do Not Sell or Share My Personal Information': 'Kişisel Verilerimi Satmayın veya Paylaşmayın',
    'Voluntary Recall': 'Gönüllü Geri Çağırma',
    'Live Chat': 'Canlı Destek',
    'Select Region': 'Bölge Seçin',
    'Newsletter Signup': 'Bültene Kayıt',

    // --- form ---
    'Email Address': 'E-posta Adresi',
    'Enter your email': 'E-posta adresinizi girin',
    'First Name': 'Ad',
    'Last Name': 'Soyad',
    'Mobile number': 'Cep telefonu',
    'Sign Up for Aromatherapica Emails': 'Aromatherapica e-postalarına kaydol',
    'Sign Up for Aromatherapica Text': 'Aromatherapica SMS bildirimlerine kaydol',
    'SIGN UP AND RECEIVE 15% OFF YOUR FIRST ORDER':
        'KAYIT OLUN, İLK SİPARİŞİNİZDE %15 İNDİRİM KAZANIN',
    'Please enter a valid email address': 'Lütfen geçerli bir e-posta adresi girin',
    'Thank you': 'Teşekkürler',

    // --- erisilebilirlik ---
    'Skip to main content': 'Ana içeriğe geç',
    'Back to main navigation': 'Ana menüye dön',
    'Scroll to bottom': 'Sayfa sonuna git',
    'Scroll to top': 'Sayfa başına git',
    'scroll to top of page': 'sayfa başına git',
    'Aromatherapica Home': 'Aromatherapica ana sayfa',
    'Aromatherapica logo': 'Aromatherapica logosu',
    'Aromatherapica | Skincare, Haircare, Bodycare & more..':
        'Aromatherapica | Cilt, saç ve vücut bakımı',
    'Aromatherapica | Skincare, Haircare, Bodycare &amp; more..':
        'Aromatherapica | Cilt, saç ve vücut bakımı',

    // --- ulkeler ---
    'United States': 'Amerika Birleşik Devletleri',
    'United Kingdom': 'Birleşik Krallık',
    'Canada': 'Kanada',
    'Germany': 'Almanya',
    'France': 'Fransa',
    'Japan': 'Japonya',
    'Taiwan': 'Tayvan',
    'Turkey': 'Türkiye',

    // --- ana sayfa bolumleri ---
    'The Aromatherapica Difference': 'Aromatherapica Farkı',
    'Aromatherapica believes': 'Aromatherapica,',
    'Meet the MVPs': 'Öne Çıkan Ürünler',
    'learn more': 'daha fazlası',
    'Terms and conditions apply.': 'Koşullar geçerlidir.',
    'Terms + conditions apply': 'Koşullar geçerlidir',
    'TERMS AND CONDITIONS APPLY.': 'KOŞULLAR GEÇERLİDİR.',

    // --- kategori sayfasi filtre bolumu ---
    'Sort By': 'Sırala',
    'Shop by': 'Kategoriler',
    'Refine Your Results By:': 'Sonuçları daralt:',

    // --- kategori sayfasi ust basligi ---
    'An ingredient-elimination philosophy for a total skin reset.':
        'Doğadan gelen saf içerikler, sade ve etkili bakım.',

    // --- promosyon seridi ---
    'Why do we subscribe? So we can save...AND get a free deluxe sample on new $50+ subscription orders!':
        'Düzenli alışverişte avantaj: 1.500 TL ve üzeri siparişlerde kargo bedava!',
    'SIGN UP AND RECEIVE 15% OFF YOUR FIRST ORDER!':
        'KAYIT OLUN, İLK SİPARİŞİNİZDE %15 İNDİRİM KAZANIN!',
    'Free Kamo sample card + travel bag with $110+ orders!':
        'Doğanın saf özü: %100 katkısız uçucu ve taşıyıcı yağlar.',
    'Free shipping (and free good mood!) with orders $40+ at checkout.':
        'Sepette 1.500 TL ve üzeri alışverişlerde kargo bedava.',
    'A.m. and p.m. serums plus a firming moisturizer to keep skin its most radiant morning, noon, and night.':
        'Sabah ve akşam bakımınız için uçucu yağlar, taşıyıcı yağlar ve nemlendiriciler — cildiniz gün boyu bakımlı kalsın.',

    // --- ana sayfa kampanya ve tanitim metinleri ---
    'NEW LAUNCH ALERT!': 'YENİ ÜRÜN!',
    'Try Kamo for free!': 'Doğallığı keşfedin!',
    'performance and': 'etkinlik ile',
    'personality can': 'doğallığın aynı',
    'live in the same jar. We believe in': 'şişede buluşabileceğine inanır.',
    'skin-smart formulas that are': 'Cilde uyumlu formüllerimiz,',
    'developed with efficacious': 'etkili düzeyde saf',
    'active ingredients that can be easily': 'aktif bileşenlerle hazırlanır;',
    'absorbed and put to use.': 'kolayca emilir ve işe yarar.',
    'The standout formulas that made': 'Aromatherapica’yı sevilen bir marka yapan',
    'a cult favorite—simple,': 'öne çıkan formüller — sade,',
    'effective, uncompromising.': 'etkili, ödün vermeyen.',
    'This site is protected by reCAPTCHA and the Google':
        'Bu site reCAPTCHA ile korunmaktadır; Google',
    '– including our policy on Financial Incentives – and the website’s':
        '– Finansal Teşvikler politikamız dâhil – ve web sitesinin',
    '– including our policy on Financial Incentives – and I agree to Aromatherapica':
        '– Finansal Teşvikler politikamız dâhil – ve Aromatherapica',

    // --- fiyat / kucuk etiketler ---
    'now': 'güncel fiyat',
    'to': 'ile',
    'and': 've',
    'apply.': 'geçerlidir.',
    'Nice flex': 'Doğallıkta esneklik',
    'Time to take cover.': 'Korunma zamanı.',
    'We know what time it is': 'Zamanın ne olduğunu biliyoruz',

    // --- sosyal ---
    'Facebook': 'Facebook',
    'Instagram': 'Instagram',
    'Youtube': 'YouTube',
    'Tik Tok': 'TikTok'
};

/* Oznitelik icinde gecen kalip cevirileri (tam metin degil, parca) */
const ATTR_PATTERNS = [
    [/^Go to the Aromatherapica (\w+) Page$/i, (m, p) => `Aromatherapica ${p} sayfasına git`],
    [/^visit the Aromatherapica Instagram page$/i, () => 'Aromatherapica Instagram sayfasını ziyaret et'],
    [/^Go to Product: (.+)$/i, (m, p) => `Ürüne git: ${p}`],
    [/^Aromatherapica Instagram page image (\d+)$/i, (m, n) => `Aromatherapica Instagram görseli ${n}`],
    [/^Pause slider$/i, () => 'Slaytı duraklat'],
    [/^Pause carousel$/i, () => 'Karuseli duraklat'],
    [/^Play Video$/i, () => 'Videoyu oynat'],
    [/^Mute Video$/i, () => 'Sesi kapat'],
    [/^Close modal$/i, () => 'Pencereyi kapat'],
    [/^search form image$/i, () => 'arama formu görseli'],
    [/^user account image$/i, () => 'hesap görseli'],
    [/^store locator image$/i, () => 'mağaza bulucu görseli'],
    [/^view shopping cart\.$/i, () => 'sepeti görüntüle'],
    [/^Search $/i, () => 'Ara'],
    [/^Search$/i, () => 'Ara']
];

const VISIBLE_ATTRS = ['alt', 'title', 'aria-label', 'placeholder'];

/* ------------------------------------------------------------------ islem */

// uzun metinler once denenmeli
const KEYS = Object.keys(DICT).sort((a, b) => b.length - a.length);

function translateText(html) {
    let n = 0;
    // metin dugumleri: > METIN <
    const out = html.replace(/>([^<>]+)</g, (m, txt) => {
        const trimmed = txt.trim();
        if (!trimmed) return m;
        if (Object.prototype.hasOwnProperty.call(DICT, trimmed)) {
            n++;
            return m.replace(txt, txt.replace(trimmed, DICT[trimmed]));
        }
        return m;
    });
    return { html: out, n };
}

function translateAttrs(html) {
    let n = 0;
    const attrRe = new RegExp(`\\s(${VISIBLE_ATTRS.join('|')})="([^"]*)"`, 'gi');
    const out = html.replace(attrRe, (m, name, val) => {
        const v = val.trim();
        if (!v) return m;
        if (Object.prototype.hasOwnProperty.call(DICT, v)) {
            n++;
            return ` ${name}="${DICT[v]}"`;
        }
        for (const [re, fn] of ATTR_PATTERNS) {
            const hit = v.match(re);
            if (hit) { n++; return ` ${name}="${fn(...hit)}"`; }
        }
        return m;
    });
    return { html: out, n };
}

/* Sablon duzeltmeleri stil dosyasi (paketlerden sonra yuklenmeli) */
function ensureFixesCss(html, file) {
    // 404 sayfasi her derinlikte sunulabildigi icin bilincli olarak kendi
    // kendine yeterlidir; goreli varlik yolu ekleme.
    if (/404\.html$/i.test(file)) return html;
    const up = /(collections|urun)[\\/]/.test(file) ? '../../'
        : (/sepet[\\/]/.test(file) ? '../' : '');

    if (!html.includes('css/site-fixes.css')) {
        html = html.replace('</head>',
            `<link rel="stylesheet" href="${up}css/site-fixes.css">\n</head>`);
    }
    // Yerlesim duzeltmesi ve yonetim paneli her sayfada bulunmali
    if (!html.includes('js/layout-fix.js')) {
        html = html.replace('</body>',
            `<script src="${up}js/layout-fix.js"></script>\n</body>`);
    }
    if (!html.includes('js/arp-store.js')) {
        html = html.replace('</body>',
            `<script src="${up}js/arp-store.js"></script>\n</body>`);
    }
    if (!html.includes('js/admin-panel.js')) {
        html = html.replace('</body>',
            `<script src="${up}js/admin-panel.js"></script>\n</body>`);
    }
    return html;
}

/* Sayfa dili ve ana sayfa basligi/aciklamasi */
function setLang(html) {
    html = html.replace(/<html\s+lang="[^"]*"/i, '<html lang="tr"');
    html = html.replace(
        /<title>Aromatherapica \| Biocompatible Skincare<\/title>/,
        '<title>Aromatherapica | Doğal Aromaterapi ve Bakım Ürünleri</title>');
    html = html.replace(
        /(<meta name="description" content=")Aromatherapica is committed[^"]*(")/,
        '$1Doğal uçucu yağlar, taşıyıcı yağlar, cilt ve saç bakım ürünleri. ' +
        'Aromatherapica ile bakımınıza doğadan gelen saflığı katın.$2');
    return html;
}

/* <script> icinde tanimlanan, kullaniciya gosterilen mesajlar.
   Bunlar metin dugumu olmadigi icin ayrica ele alinir. */
const JS_STRINGS = [
    ['var newsletterErrorMessage = "Please enter a valid email address";',
        'var newsletterErrorMessage = "Lütfen geçerli bir e-posta adresi girin";'],
    ['var newsletterThankYouMessage = "Thank you";',
        'var newsletterThankYouMessage = "Teşekkürler";'],
    ['var newsletterRecieve = "You will receive the Aromatherapica newsletter at:";',
        'var newsletterRecieve = "Aromatherapica bültenini şu adreste alacaksınız:";']
];

function translateScripts(html) {
    let n = 0;
    for (const [eski, yeni] of JS_STRINGS) {
        if (html.includes(eski)) { html = html.split(eski).join(yeni); n++; }
    }
    return { html, n };
}

function allHtmlFiles() {
    const out = [];
    (function walk(dir) {
        for (const f of fs.readdirSync(dir)) {
            if (f === '.git' || f === 'node_modules') continue;
            // Sablon klasorleri her derlemede okunuyor; degistirilmemeli
            if (/^(kategorikismi|ürüne özel|site sepet)/.test(f)) continue;
            const fp = path.join(dir, f);
            const st = fs.statSync(fp);
            if (st.isDirectory()) walk(fp);
            else if (/\.html?$/i.test(f)) out.push(fp);
        }
    })(ROOT);
    return out;
}

function main() {
    let toplamMetin = 0, toplamOznitelik = 0, dosya = 0;
    for (const file of allHtmlFiles()) {
        const src = fs.readFileSync(file, 'utf8');
        let html = ensureFixesCss(setLang(src), file);
        const a = translateText(html); html = a.html;
        const b = translateAttrs(html); html = b.html;
        const c = translateScripts(html); html = c.html;
        if (html !== src) {
            fs.writeFileSync(file, html, 'utf8');
            dosya++;
            toplamMetin += a.n; toplamOznitelik += b.n;
            const rel = path.relative(ROOT, file).replace(/\\/g, '/');
            console.log(`  ${rel.padEnd(46)} metin:${String(a.n).padStart(3)}  oznitelik:${String(b.n).padStart(3)}`);
        }
    }
    console.log(`\n${dosya} dosya guncellendi | ${toplamMetin} metin, ${toplamOznitelik} oznitelik cevrildi.`);
}

main();
