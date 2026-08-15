/* ==========================================================================
   Aromatherapica - Yerlesim duzeltmesi
   --------------------------------------------------------------------------
   Ust menu (.de-nav-wrapper) "position: fixed" oldugu icin normal akistan
   cikar ve kendisine yer ayirmaz. Bu isi sarmalayicisi (.de-nav-placeholder)
   yapmali; ancak yuksekligini veren kural artik yuklenmeyen bir uzak
   stylesheet'te kaldigindan placeholder 0 yukseklikte kaliyor ve sayfa
   icerigi menunun altina girip yazilar ust uste biniyordu.

   Burada placeholder'in yuksekligi menunun gercek yuksekligine esitlenir ve
   ekran boyutu, font yuklemesi veya menu acilip kapanmasi gibi durumlarda
   guncel tutulur.
   ========================================================================== */
(function () {
    'use strict';

    var applied = 0;

    function sync() {
        var ph = document.querySelector('.de-nav-placeholder');
        if (!ph) return;
        var nav = ph.querySelector('.de-nav-wrapper');
        if (!nav) return;

        // Menu akista ise (ornegin dar ekran duzeni) yer ayirmaya gerek yok
        if (getComputedStyle(nav).position !== 'fixed') {
            if (ph.style.height) ph.style.height = '';
            applied = 0;
            return;
        }

        // Sayfa kaydirildiginda konumu sitenin kendi sticky mantigi yonetir
        if (nav.classList.contains('de-sticky-on-scroll')) return;

        /* 1) Menunun dikey konumu.
           Sitenin kendi kodu window.load aninda promosyon seridini bir kez
           olcup menuyu oraya sabitliyor. Serit o an henuz yerlesmemis olabildigi
           icin menu yanlis yukseklige cakiliyor (icerigin uzerine biniyordu).
           Burada guncel yukseklige gore duzeltiyoruz. */
        var promo = document.querySelector('.promo-banner-container');
        var promoH = promo ? Math.round(promo.getBoundingClientRect().height) : 0;
        if (Math.abs((parseFloat(nav.style.top) || 0) - promoH) > 1) {
            nav.style.top = promoH + 'px';
        }

        // 2) Menunun yuksekligi kadar akista yer ayir
        var h = nav.offsetHeight;
        if (h > 0 && Math.abs(h - applied) > 1) {
            ph.style.height = h + 'px';
            applied = h;
        }

        // 3) Arama cubugu da ayni olcumden besleniyor
        var sb = document.querySelector('.de-search-bar');
        if (sb && getComputedStyle(sb).position === 'fixed') {
            var want = promoH + h;
            if (Math.abs((parseFloat(sb.style.top) || 0) - want) > 1) {
                sb.style.top = want + 'px';
            }
        }
    }

    /* Ekran boyutu degistiginde menu yuksekligi CSS gecisleri ve sitenin kendi
       scriptleri nedeniyle hemen oturmaz. Tek olcum bayat deger birakabildigi
       icin degisimin ardindan birkac kez daha olceriz. */
    var timers = [];
    function scheduleSync() {
        sync();
        if (window.requestAnimationFrame) requestAnimationFrame(sync);
        timers.forEach(clearTimeout);
        timers = [80, 250, 600].map(function (ms) { return setTimeout(sync, ms); });
    }

    function bind() {
        sync();

        window.addEventListener('resize', scheduleSync, { passive: true });
        window.addEventListener('orientationchange', scheduleSync);

        // Ozel fontlar gec yuklendiginde menu yuksekligi degisebilir
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
            document.fonts.ready.then(sync).catch(function () { });
        }

        // Menu icerigi degistiginde (acilma/kapanma, gec gelen bloklar)
        if (window.ResizeObserver) {
            var nav = document.querySelector('.de-nav-placeholder .de-nav-wrapper');
            if (nav) {
                try { new ResizeObserver(function () { scheduleSync(); }).observe(nav); } catch (e) { }
            }
        }

        // Kirilma noktasi degisimleri: resize olayini kacirsak bile bunlar calisir
        if (window.matchMedia) {
            [480, 640, 768, 992, 1024, 1200].forEach(function (bp) {
                var mq = window.matchMedia('(min-width: ' + bp + 'px)');
                if (mq.addEventListener) mq.addEventListener('change', scheduleSync);
                else if (mq.addListener) mq.addListener(scheduleSync);
            });
        }

        // Gec calisan site scriptleri icin birkac emniyet olcumu
        [200, 700, 1600, 3000].forEach(function (ms) { setTimeout(sync, ms); });

        // Ilk saniyelerde kendi kendini onaran kontrol: hicbir olay tetiklenmese
        // bile yerlesim oturana kadar dogru degeri yakalar. Sonra durur.
        var kalan = 14;
        var iv = setInterval(function () {
            sync();
            if (--kalan <= 0) clearInterval(iv);
        }, 450);

        // Sekmeye geri donuldugunde olculeri tazele
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) scheduleSync();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
    window.addEventListener('load', sync);
})();
