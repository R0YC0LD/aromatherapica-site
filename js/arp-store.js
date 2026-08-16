/* ==========================================================================
   Aromatherapica - Magaza motoru
   --------------------------------------------------------------------------
   Sablon Salesforce Commerce arka ucuna bagliydi; o servisler calismadigi icin
   sepet, siralama ve filtreleme islevleri burada tarayici tarafinda yazildi.

   Sagladiklari:
     - Sepet (localStorage): ekle / adet degistir / sil / topla
     - Basliktaki sepet sayaci (tum sayfalarda senkron)
     - Kategori sayfasinda siralama (fiyat, isim, onerilen)
     - Sepet sayfasinin dolu/bos durumlarini cizmek

   Veri kaynagi: urun kartlarindaki data-* oznitelikleri (kategori sayfasi) ve
   urun sayfasindaki #arp-urun JSON blogu.
   ========================================================================== */
(function () {
    'use strict';

    var ANAHTAR = 'arp_sepet_v1';
    var PARA = new Intl.NumberFormat('tr-TR', {
        style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 2
    });

    /* ------------------------------------------------------------- depolama */

    function oku() {
        try {
            var ham = localStorage.getItem(ANAHTAR);
            var d = ham ? JSON.parse(ham) : [];
            return Array.isArray(d) ? d : [];
        } catch (e) { return []; }
    }

    function yaz(sepet) {
        try { localStorage.setItem(ANAHTAR, JSON.stringify(sepet)); } catch (e) { }
        sayaciGuncelle();
        document.dispatchEvent(new CustomEvent('arp:sepet-degisti'));
    }

    function adet() { return oku().reduce(function (t, s) { return t + s.qty; }, 0); }
    function toplam() { return oku().reduce(function (t, s) { return t + s.price * s.qty; }, 0); }

    /* --------------------------------------------------------------- islem */

    function ekle(urun, qty) {
        qty = Math.max(1, parseInt(qty, 10) || 1);
        var sepet = oku();
        var v = sepet.find(function (s) { return s.id === urun.id; });
        if (v) v.qty += qty;
        else sepet.push({
            id: urun.id, slug: urun.slug, name: urun.name,
            price: Number(urun.price) || 0, image: urun.image || '', qty: qty
        });
        yaz(sepet);
        bildir(urun.name + ' sepete eklendi.');
    }

    function adetAyarla(id, qty) {
        var sepet = oku();
        var v = sepet.find(function (s) { return s.id === id; });
        if (!v) return;
        v.qty = Math.max(1, parseInt(qty, 10) || 1);
        yaz(sepet);
    }

    function sil(id) {
        yaz(oku().filter(function (s) { return s.id !== id; }));
    }

    /* ------------------------------------------------------------ arayuz */

    function sayaciGuncelle() {
        var n = adet();
        document.querySelectorAll('.minicart-qty-value, .minicart-quantity, .de-cart-count')
            .forEach(function (e) { e.textContent = n; });
        document.querySelectorAll('#mini-cart, .mini-cart-link')
            .forEach(function (e) { e.setAttribute('data-count', n); });
    }

    var bildirimZaman;
    function bildir(mesaj) {
        var el = document.querySelector('.arp-bildirim');
        if (!el) {
            el = document.createElement('div');
            el.className = 'arp-bildirim';
            document.body.appendChild(el);
        }
        el.textContent = mesaj;
        el.classList.add('is-on');
        clearTimeout(bildirimZaman);
        bildirimZaman = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
    }

    /* --------------------------------------------------------- siralama */

    var SIRALAMA = {
        'onerilen': null,
        'fiyat-artan': function (a, b) { return a.fiyat - b.fiyat; },
        'fiyat-azalan': function (a, b) { return b.fiyat - a.fiyat; },
        'isim-az': function (a, b) { return a.isim.localeCompare(b.isim, 'tr'); },
        'isim-za': function (a, b) { return b.isim.localeCompare(a.isim, 'tr'); }
    };

    function siralamayiKur() {
        /* Kategori filtreleri: sablonun product-list.js dosyasi ".filter-pills"
           tiklamasina baglanip calismayan bir AJAX cagrisi yapiyor ve gezinmeyi
           engelliyor. Yakalama asamasinda kendimiz yonlendiriyoruz. */
        document.addEventListener('click', function (e) {
            var pil = e.target.closest && e.target.closest('.filter-pills');
            if (!pil) return;
            var hedef = pil.getAttribute('href') || pil.getAttribute('data-href');
            if (!hedef || hedef === 'javascript:void(0)') return;
            e.preventDefault();
            e.stopPropagation();
            location.href = hedef;
        }, true);

        var kap = document.querySelector('.js-product-container');
        var secim = document.querySelector('#arp-siralama');
        if (!kap || !secim) return;

        // ilk sirayi "onerilen" olarak sakla
        var kartlar = Array.prototype.slice.call(kap.querySelectorAll('.product-card'));
        kartlar.forEach(function (k, i) { k.dataset.arpSira = i; });

        function uygula() {
            var fn = SIRALAMA[secim.value];
            var liste = kartlar.slice().map(function (k) {
                var kart = k.querySelector('.js-product-card');
                return {
                    el: k,
                    fiyat: parseFloat(kart && kart.dataset.arpFiyat) || 0,
                    isim: (kart && kart.dataset.arpIsim) || '',
                    sira: parseInt(k.dataset.arpSira, 10)
                };
            });
            liste.sort(fn || function (a, b) { return a.sira - b.sira; });
            var parca = document.createDocumentFragment();
            liste.forEach(function (x) { parca.appendChild(x.el); });
            kap.appendChild(parca);
            try { localStorage.setItem('arp_siralama', secim.value); } catch (e) { }
        }

        var kayitli = null;
        try { kayitli = localStorage.getItem('arp_siralama'); } catch (e) { }
        if (kayitli && SIRALAMA.hasOwnProperty(kayitli)) secim.value = kayitli;

        secim.addEventListener('change', uygula);
        if (secim.value !== 'onerilen') uygula();
    }

    /* ------------------------------------------------------- sepete ekleme */

    function kartUrunu(kart) {
        return {
            id: kart.dataset.arpId,
            slug: kart.dataset.arpSlug,
            name: kart.dataset.arpIsim,
            price: parseFloat(kart.dataset.arpFiyat) || 0,
            image: kart.dataset.arpGorsel || ''
        };
    }

    function sepeteEklemeyiKur() {
        document.addEventListener('click', function (e) {
            var btn = e.target.closest && e.target.closest('[data-arp-ekle]');
            if (!btn) return;
            e.preventDefault();

            // kategori sayfasi: veriler kartta
            var kart = btn.closest('.js-product-card');
            if (kart && kart.dataset.arpId) { ekle(kartUrunu(kart), 1); return; }

            // urun sayfasi: veriler #arp-urun icinde
            var veri = document.getElementById('arp-urun');
            if (veri) {
                try {
                    var u = JSON.parse(veri.textContent);
                    var miktar = document.querySelector('#arp-adet');
                    ekle(u, miktar ? miktar.value : 1);
                } catch (err) { }
            }
        });
    }

    /* ---------------------------------------------------------- sepet sayfasi */

    function sepetiCiz() {
        var kok = document.getElementById('arp-sepet');
        if (!kok) return;

        var sepet = oku();
        var bos = document.querySelector('.de-empty-cart');
        var baslik = document.querySelector('.shopping-bag');
        if (baslik) baslik.textContent = 'sepetim (' + adet() + ')';

        if (!sepet.length) {
            kok.innerHTML = '';
            if (bos) bos.style.display = '';
            return;
        }
        if (bos) bos.style.display = 'none';

        var satirlar = sepet.map(function (s) {
            return '<li class="arp-sepet-satir" data-id="' + s.id + '">' +
                '<a class="arp-sepet-gorsel" href="../urun/' + s.slug + '/">' +
                '<img src="' + s.image + '" alt="' + s.name + '"></a>' +
                '<div class="arp-sepet-bilgi">' +
                '<a class="arp-sepet-ad" href="../urun/' + s.slug + '/">' + s.name + '</a>' +
                '<p class="arp-sepet-birim">' + PARA.format(s.price) + '</p>' +
                '<div class="arp-sepet-adet">' +
                '<button type="button" class="arp-eksi" aria-label="Adeti azalt">−</button>' +
                '<input type="number" min="1" value="' + s.qty + '" aria-label="Adet">' +
                '<button type="button" class="arp-arti" aria-label="Adeti artır">+</button>' +
                '</div></div>' +
                '<div class="arp-sepet-sag">' +
                '<p class="arp-sepet-tutar">' + PARA.format(s.price * s.qty) + '</p>' +
                '<button type="button" class="arp-sil">Kaldır</button>' +
                '</div></li>';
        }).join('');

        var ara = toplam();
        var kargo = ara >= 1500 || ara === 0 ? 0 : 89.9;

        kok.innerHTML =
            '<div class="arp-sepet-duzen">' +
            '<ul class="arp-sepet-liste">' + satirlar + '</ul>' +
            '<aside class="arp-sepet-ozet">' +
            '<h2>Sipariş Özeti</h2>' +
            '<div class="arp-ozet-satir"><span>Ara toplam</span><span>' + PARA.format(ara) + '</span></div>' +
            '<div class="arp-ozet-satir"><span>Kargo</span><span>' + (kargo ? PARA.format(kargo) : 'Ücretsiz') + '</span></div>' +
            (kargo ? '<p class="arp-ozet-not">' + PARA.format(1500 - ara) + ' daha ekleyin, kargo bedava olsun.</p>' : '') +
            '<div class="arp-ozet-satir arp-ozet-toplam"><span>Toplam</span><span>' + PARA.format(ara + kargo) + '</span></div>' +
            '<button type="button" class="de-btn de-btn--black arp-odeme">Ödemeye Geç</button>' +
            '<a class="arp-sepet-devam" href="../">Alışverişe devam et</a>' +
            '</aside></div>';
    }

    function sepetOlaylari() {
        var kok = document.getElementById('arp-sepet');
        if (!kok) return;
        kok.addEventListener('click', function (e) {
            var satir = e.target.closest('.arp-sepet-satir');
            if (!satir) return;
            var id = satir.dataset.id;
            var giris = satir.querySelector('input');
            if (e.target.closest('.arp-sil')) sil(id);
            else if (e.target.closest('.arp-arti')) adetAyarla(id, +giris.value + 1);
            else if (e.target.closest('.arp-eksi')) adetAyarla(id, +giris.value - 1);
            else if (e.target.closest('.arp-odeme')) bildir('Ödeme adımı henüz bağlanmadı.');
        });
        kok.addEventListener('change', function (e) {
            if (e.target.matches('.arp-sepet-adet input')) {
                var satir = e.target.closest('.arp-sepet-satir');
                adetAyarla(satir.dataset.id, e.target.value);
            }
        });
        document.addEventListener('arp:sepet-degisti', sepetiCiz);
    }

    /* ------------------------------------------------------------------ kur */

    function kur() {
        sayaciGuncelle();
        siralamayiKur();
        sepeteEklemeyiKur();
        sepetiCiz();
        sepetOlaylari();
        // baska sekmede sepet degisirse burada da guncellensin
        window.addEventListener('storage', function (e) {
            if (e.key === ANAHTAR) { sayaciGuncelle(); sepetiCiz(); }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kur);
    else kur();

    window.ARP = { ekle: ekle, sil: sil, oku: oku, adet: adet, toplam: toplam };
})();
