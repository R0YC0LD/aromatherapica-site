/* ==========================================================================
   Aromatherapica - Yonetim Paneli
   --------------------------------------------------------------------------
   Acilis  : Header/footer'daki "Aromatherapica" logosuna arka arkaya 4 tiklama
   Giris   : admin / admin12345
   Saklama : localStorage (onizleme) + content.json (yayindaki gercek icerik)

   NOT: Bu statik bir sitedir; sunucu tarafi yoktur. Giris bilgisi bu dosyanin
   icinde acik durur ve kaynak koddan gorulebilir. Gercek erisim korumasi
   degildir - sadece panelin kazara acilmasini engeller.
   ========================================================================== */
(function () {
    'use strict';

    var CFG = {
        user: 'admin',
        pass: 'admin12345',
        clicksNeeded: 4,
        clickWindow: 1400,
        lsKey: 'arp_content_v1',
        ssKey: 'arp_session_v1',
        contentFile: 'content.json',
        maxImageBytes: 1400000
    };

    var store = {};        // key -> { t:'text'|'img', v:'...' }
    var baseline = {};     // key -> original value (revert icin)
    var editMode = false;
    var panel, tab, badge, toastEl, overlay;

    /* ---------------------------------------------------------------- utils */

    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function el(tag, cls, html) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (html != null) n.innerHTML = html;
        return n;
    }

    function toast(msg, isErr) {
        if (!toastEl) {
            toastEl = el('div', 'arp-root arp-toast');
            document.body.appendChild(toastEl);
        }
        toastEl.textContent = msg;
        toastEl.className = 'arp-root arp-toast is-on' + (isErr ? ' is-err' : '');
        clearTimeout(toastEl._t);
        toastEl._t = setTimeout(function () {
            toastEl.className = 'arp-root arp-toast' + (isErr ? ' is-err' : '');
        }, 2600);
    }

    /* Kararli anahtar: body'den itibaren etiket + kardes sirasi */
    function keyOf(node) {
        var parts = [], cur = node;
        while (cur && cur !== document.body && cur.nodeType === 1) {
            var p = cur.parentNode;
            if (!p || p.nodeType !== 1) break;
            var i = 1, sib = p.firstElementChild;
            while (sib && sib !== cur) {
                if (sib.tagName === cur.tagName) i++;
                sib = sib.nextElementSibling;
            }
            parts.unshift((cur.tagName + '').toLowerCase() + '.' + i);
            cur = p;
        }
        return parts.join('/');
    }

    var SKIP = /^(script|style|noscript|template|option|title|path|rect|circle|line|polygon|polyline|defs|clippath|lineargradient|stop|use|g|br|input|select|textarea|iframe|video|source|audio)$/;

    /* Sadece metin dugumleri (ve <br>) iceren elemanlar duzenlenebilir */
    function isTextEditable(node) {
        if (!node || node.nodeType !== 1) return false;
        var tag = (node.tagName + '').toLowerCase();
        if (SKIP.test(tag)) return false;
        if (node.closest && node.closest('.arp-root, .arp-panel, .arp-overlay')) return false;
        var kids = node.childNodes, hasText = false;
        for (var i = 0; i < kids.length; i++) {
            var n = kids[i];
            if (n.nodeType === 3) {
                if (n.nodeValue.trim()) hasText = true;
            } else if (n.nodeType === 1) {
                if ((n.tagName + '').toLowerCase() !== 'br') return false;
            } else if (n.nodeType !== 8) {
                return false;
            }
        }
        return hasText;
    }

    /* Duzenlenebilir icerigi <br> koruyarak duz metne cevirir */
    function readText(node) {
        var out = '';
        node.childNodes.forEach ? null : null;
        Array.prototype.forEach.call(node.childNodes, function (n) {
            if (n.nodeType === 3) out += n.nodeValue;
            else if (n.nodeType === 1 && (n.tagName + '').toLowerCase() === 'br') out += '\n';
        });
        return out.replace(/[ \t]+/g, ' ').replace(/\n /g, '\n').trim();
    }

    function writeText(node, val) {
        var isSvgText = (node.tagName + '').toLowerCase() === 'text';
        if (isSvgText) {
            node.textContent = String(val).replace(/\n/g, ' ');
            return;
        }
        node.innerHTML = String(val).split('\n').map(esc).join('<br>');
    }

    /* ------------------------------------------------------------- indexing */

    var textNodes = [], imgNodes = [];

    function indexPage() {
        textNodes = [];
        imgNodes = [];
        var all = document.body.querySelectorAll('*');
        for (var i = 0; i < all.length; i++) {
            var n = all[i];
            var tag = (n.tagName + '').toLowerCase();
            if (n.closest && n.closest('.arp-root, .arp-panel, .arp-overlay, .arp-tab')) continue;
            if (tag === 'img') {
                var k = keyOf(n);
                n.setAttribute('data-arp-img', k);
                if (!(k in baseline)) baseline[k] = n.getAttribute('src') || '';
                imgNodes.push(n);
            } else if (isTextEditable(n)) {
                var kt = keyOf(n);
                n.setAttribute('data-arp-text', kt);
                if (!(kt in baseline)) baseline[kt] = readText(n);
                textNodes.push(n);
            }
        }
    }

    /* ------------------------------------------------------------ persist */

    function loadLocal() {
        try {
            var raw = localStorage.getItem(CFG.lsKey);
            if (raw) store = JSON.parse(raw) || {};
        } catch (e) { store = {}; }
    }

    function saveLocal() {
        try {
            localStorage.setItem(CFG.lsKey, JSON.stringify(store));
            return true;
        } catch (e) {
            toast('Kaydedilemedi: tarayici depolama siniri doldu. Buyuk gorseller yerine URL kullanin.', true);
            return false;
        }
    }

    /* Konum anahtari birincil; carousel klonlari / gec yuklenen bloklar icin
       kayittaki orijinal deger (rec.o) uzerinden yedek eslestirme yapilir. */
    function applyStore() {
        Object.keys(store).forEach(function (k) {
            var rec = store[k];
            if (!rec) return;
            var attr = rec.t === 'img' ? 'data-arp-img' : 'data-arp-text';
            var node = document.querySelector('[' + attr + '="' + CSS.escape(k) + '"]');

            if (rec.t === 'img') {
                if (node) node.setAttribute('src', rec.v);
                if (rec.o) {
                    var imgs = document.querySelectorAll('[data-arp-img]');
                    for (var i = 0; i < imgs.length; i++) {
                        if (baseline[imgs[i].getAttribute('data-arp-img')] === rec.o) {
                            imgs[i].setAttribute('src', rec.v);
                        }
                    }
                }
                return;
            }

            if (node) { writeText(node, rec.v); return; }
            if (rec.o == null) return;
            var txts = document.querySelectorAll('[data-arp-text]');
            for (var j = 0; j < txts.length; j++) {
                var tk = txts[j].getAttribute('data-arp-text');
                if (baseline[tk] === rec.o && readText(txts[j]) === rec.o) {
                    writeText(txts[j], rec.v);
                    return;
                }
            }
        });
    }

    /* Bir kaydi orijinaline dondurur (klonlar dahil) */
    function restore(k, rec) {
        var orig = (rec && rec.o != null) ? rec.o : (baseline[k] || '');
        var attr = rec.t === 'img' ? 'data-arp-img' : 'data-arp-text';
        var node = document.querySelector('[' + attr + '="' + CSS.escape(k) + '"]');
        if (node) {
            if (rec.t === 'img') node.setAttribute('src', orig);
            else writeText(node, orig);
        }
        if (rec.t === 'img' && rec.o) {
            var imgs = document.querySelectorAll('[data-arp-img]');
            for (var i = 0; i < imgs.length; i++) {
                if (baseline[imgs[i].getAttribute('data-arp-img')] === rec.o) {
                    imgs[i].setAttribute('src', orig);
                }
            }
        } else if (!node && rec.t === 'text') {
            var txts = document.querySelectorAll('[data-arp-text]');
            for (var j = 0; j < txts.length; j++) {
                if (readText(txts[j]) === rec.v) { writeText(txts[j], orig); break; }
            }
        }
    }

    /* Carousel'ler slayt klonladigi icin DOM yerlesimi gec degisebilir */
    function refresh() {
        indexPage();
        applyStore();
        if (editMode) setEditMode(true);
        renderList();
    }

    /* Yayindaki gercek icerik: content.json (varsa) */
    function loadContentFile(done) {
        if (!window.fetch || location.protocol === 'file:') return done();
        fetch(CFG.contentFile, { cache: 'no-store' })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                if (data && typeof data === 'object') {
                    Object.keys(data).forEach(function (k) {
                        if (!(k in store)) store[k] = data[k];   // local degisiklik onceliklidir
                    });
                }
                done();
            })
            .catch(function () { done(); });
    }

    /* --------------------------------------------------------------- login */

    function openLogin() {
        if (document.querySelector('.arp-overlay')) return;
        if (sessionStorage.getItem(CFG.ssKey) === '1') { openPanel(); return; }

        overlay = el('div', 'arp-root arp-overlay');
        overlay.innerHTML =
            '<form class="arp-login" autocomplete="off">' +
            '<p class="arp-login__brand">Aromatherapica</p>' +
            '<p class="arp-login__sub">Yonetim paneline giris</p>' +
            '<div class="arp-field"><label for="arp-u">Kullanici adi</label>' +
            '<input class="arp-input" id="arp-u" type="text" autocomplete="off"></div>' +
            '<div class="arp-field"><label for="arp-p">Sifre</label>' +
            '<input class="arp-input" id="arp-p" type="password" autocomplete="off"></div>' +
            '<div class="arp-login__err" id="arp-err"></div>' +
            '<button class="arp-btn arp-btn--primary arp-btn--block" type="submit">Giris yap</button>' +
            '<button class="arp-btn arp-btn--block" type="button" id="arp-cancel" style="margin-top:8px">Vazgec</button>' +
            '<p class="arp-login__hint">Bu panel yalnizca tarayicinizda calisir. Degisiklikleri yayina almak icin panelden <b>Disa aktar</b> ile <code>content.json</code> dosyasini indirip depoya ekleyin.</p>' +
            '</form>';
        document.body.appendChild(overlay);
        setTimeout(function () { var u = document.getElementById('arp-u'); if (u) u.focus(); }, 60);

        overlay.querySelector('#arp-cancel').onclick = closeLogin;
        overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeLogin(); });
        document.addEventListener('keydown', escLogin);

        overlay.querySelector('form').onsubmit = function (e) {
            e.preventDefault();
            var u = document.getElementById('arp-u').value.trim();
            var p = document.getElementById('arp-p').value;
            if (u === CFG.user && p === CFG.pass) {
                sessionStorage.setItem(CFG.ssKey, '1');
                closeLogin();
                openPanel();
                toast('Giris basarili. Duzenleme modunu acabilirsiniz.');
            } else {
                document.getElementById('arp-err').textContent = 'Kullanici adi veya sifre hatali.';
                document.getElementById('arp-p').value = '';
            }
        };
    }

    function escLogin(e) { if (e.key === 'Escape') closeLogin(); }

    function closeLogin() {
        document.removeEventListener('keydown', escLogin);
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        overlay = null;
    }

    /* --------------------------------------------------------------- panel */

    function openPanel() {
        if (!panel) buildPanel();
        indexPage();
        renderList();
        panel.classList.add('is-open');
        if (tab) tab.style.display = 'none';
    }

    function closePanel() {
        if (panel) panel.classList.remove('is-open');
        setEditMode(false);
        if (tab) tab.style.display = '';
    }

    function buildPanel() {
        panel = el('aside', 'arp-root arp-panel');
        panel.innerHTML =
            '<div class="arp-panel__head">' +
            '<h2 class="arp-panel__title">Yonetim Paneli<span>Aromatherapica icerik duzenleyici</span></h2>' +
            '<button class="arp-iconbtn" id="arp-close" title="Kapat">&times;</button>' +
            '</div>' +
            '<div class="arp-panel__body">' +

            '<div class="arp-sec">' +
            '<div class="arp-toggle" id="arp-toggle">' +
            '<div class="arp-toggle__txt"><strong>Duzenleme modu <em id="arp-mode">kapali</em></strong>' +
            '<small>Metne tiklayip yazin, gorsele tiklayip degistirin</small></div>' +
            '<div class="arp-switch"></div></div>' +
            '</div>' +

            '<div class="arp-sec">' +
            '<p class="arp-sec__title">Sayfa ozeti</p>' +
            '<div class="arp-stats">' +
            '<div class="arp-stat"><b id="arp-n-text">0</b><span>metin</span></div>' +
            '<div class="arp-stat"><b id="arp-n-img">0</b><span>gorsel</span></div>' +
            '<div class="arp-stat"><b id="arp-n-chg">0</b><span>degisiklik</span></div>' +
            '</div></div>' +

            '<div class="arp-sec">' +
            '<p class="arp-sec__title">Degisiklikler <b id="arp-chg-lbl"></b></p>' +
            '<div class="arp-list" id="arp-list"></div>' +
            '</div>' +

            '<div class="arp-sec">' +
            '<p class="arp-sec__title">Yayina alma</p>' +
            '<div class="arp-row">' +
            '<button class="arp-btn arp-btn--primary" id="arp-export">Disa aktar</button>' +
            '<button class="arp-btn" id="arp-import">Ice aktar</button>' +
            '</div>' +
            '<p class="arp-note">Degisiklikler simdilik yalnizca <b>bu tarayicida</b> saklanir. Herkesin gormesi icin ' +
            '<b>Disa aktar</b> ile inen <code>content.json</code> dosyasini depodaki ayni isimli dosyayla degistirin.</p>' +
            '</div>' +

            '<div class="arp-sec">' +
            '<p class="arp-sec__title">Oturum</p>' +
            '<div class="arp-row">' +
            '<button class="arp-btn arp-btn--danger" id="arp-reset">Tumunu sifirla</button>' +
            '<button class="arp-btn" id="arp-logout">Cikis</button>' +
            '</div></div>' +

            '</div>';
        document.body.appendChild(panel);

        tab = el('button', 'arp-root arp-tab', 'Panel');
        tab.style.display = 'none';
        tab.onclick = openPanel;
        document.body.appendChild(tab);

        badge = el('div', 'arp-root arp-badge', 'Degistir');
        document.body.appendChild(badge);

        panel.querySelector('#arp-close').onclick = closePanel;
        panel.querySelector('#arp-toggle').onclick = function () { setEditMode(!editMode); };
        panel.querySelector('#arp-export').onclick = doExport;
        panel.querySelector('#arp-import').onclick = doImport;
        panel.querySelector('#arp-reset').onclick = doReset;
        panel.querySelector('#arp-logout').onclick = function () {
            sessionStorage.removeItem(CFG.ssKey);
            closePanel();
            if (tab) tab.style.display = 'none';
            toast('Cikis yapildi.');
        };
    }

    /* ----------------------------------------------------------- edit mode */

    function setEditMode(on) {
        editMode = !!on;
        document.body.classList.toggle('arp-edit-on', editMode);
        var t = panel && panel.querySelector('#arp-toggle');
        if (t) {
            t.classList.toggle('is-on', editMode);
            // Sitenin genis kapsamli CSS'i panel kurallarini ezebildigi icin
            // anahtarin gorsel durumu dogrudan inline set ediliyor.
            var lbl = t.querySelector('#arp-mode');
            if (lbl) {
                lbl.textContent = editMode ? 'ACIK' : 'kapali';
                lbl.style.cssText = 'font-style:normal;font-size:11px;letter-spacing:.06em;padding:1px 6px;' +
                    'border-radius:4px;margin-left:6px;' +
                    (editMode ? 'background:#7cc9e8;color:#0d2129;' : 'background:#3a4048;color:#9aa3ad;');
            }
            var sw = t.querySelector('.arp-switch');
            if (sw) {
                sw.style.setProperty('background', editMode ? '#7cc9e8' : '#3a4048', 'important');
                var knob = sw.querySelector('.arp-knob');
                if (!knob) {
                    knob = document.createElement('span');
                    knob.className = 'arp-knob';
                    sw.appendChild(knob);
                }
                knob.style.cssText = 'position:absolute;top:3px;left:3px;width:18px;height:18px;' +
                    'border-radius:50%;background:#fff;transition:transform .18s;' +
                    'transform:translateX(' + (editMode ? 18 : 0) + 'px);';
            }
        }

        textNodes.forEach(function (n) {
            if (editMode) {
                n.setAttribute('contenteditable', 'plaintext-only');
                if (n.contentEditable !== 'plaintext-only') n.setAttribute('contenteditable', 'true');
            } else {
                n.removeAttribute('contenteditable');
            }
        });
        if (!editMode && badge) badge.classList.remove('is-on');
    }

    function onTextBlur(e) {
        var node = e.target.closest && e.target.closest('[data-arp-text]');
        if (!node || !editMode) return;
        var k = node.getAttribute('data-arp-text');
        var val = readText(node);
        if (val === baseline[k]) { delete store[k]; }
        else { store[k] = { t: 'text', v: val, o: baseline[k] }; }
        saveLocal();
        renderList();
    }

    function onPageClick(e) {
        if (!editMode) return;
        var img = e.target.closest && e.target.closest('[data-arp-img]');
        if (img) { e.preventDefault(); e.stopPropagation(); openImageDialog(img); return; }
        var link = e.target.closest && e.target.closest('a');
        if (link) e.preventDefault();   // duzenleme modunda linkler gezinmesin
    }

    function onPageOver(e) {
        if (!editMode || !badge) return;
        var img = e.target.closest && e.target.closest('[data-arp-img]');
        if (!img) { badge.classList.remove('is-on'); return; }
        var r = img.getBoundingClientRect();
        badge.style.left = Math.max(4, r.left + 6) + 'px';
        badge.style.top = Math.max(4, r.top + 6) + 'px';
        badge.classList.add('is-on');
    }

    /* -------------------------------------------------------- image dialog */

    function openImageDialog(img) {
        var k = img.getAttribute('data-arp-img');
        var cur = img.getAttribute('src') || '';
        var ov = el('div', 'arp-root arp-overlay');
        ov.innerHTML =
            '<div class="arp-dlg">' +
            '<h3>Gorseli degistir</h3>' +
            '<p class="arp-dlg__sub">Bilgisayarinizdan bir dosya secin ya da gorsel adresi yapistirin.</p>' +
            '<div class="arp-preview" id="arp-prev"></div>' +
            '<button class="arp-btn arp-btn--block" id="arp-pick">Dosya sec</button>' +
            '<input type="file" id="arp-file" accept="image/*" style="display:none">' +
            '<p class="arp-or">veya</p>' +
            '<div class="arp-field"><label for="arp-url">Gorsel adresi</label>' +
            '<input class="arp-input" id="arp-url" type="text" placeholder="images/... veya https://..."></div>' +
            '<div class="arp-row" style="margin-top:16px">' +
            '<button class="arp-btn arp-btn--primary" id="arp-ok">Uygula</button>' +
            '<button class="arp-btn" id="arp-x">Vazgec</button></div>' +
            (store[k] ? '<button class="arp-btn arp-btn--danger arp-btn--block" id="arp-rv" style="margin-top:8px">Orijinaline don</button>' : '') +
            '</div>';
        document.body.appendChild(ov);

        var prev = ov.querySelector('#arp-prev');
        var urlIn = ov.querySelector('#arp-url');
        var pending = null;
        prev.style.backgroundImage = 'url("' + cur.replace(/"/g, '\\"') + '")';
        urlIn.value = /^data:/.test(cur) ? '' : cur;

        function close() { if (ov.parentNode) ov.parentNode.removeChild(ov); }

        ov.querySelector('#arp-x').onclick = close;
        ov.addEventListener('mousedown', function (e) { if (e.target === ov) close(); });
        ov.querySelector('#arp-pick').onclick = function () { ov.querySelector('#arp-file').click(); };

        ov.querySelector('#arp-file').onchange = function () {
            var f = this.files && this.files[0];
            if (!f) return;
            if (f.size > CFG.maxImageBytes) {
                toast('Dosya cok buyuk (' + Math.round(f.size / 1024) + ' KB). 1.4 MB altinda bir gorsel secin ya da adres kullanin.', true);
                return;
            }
            var fr = new FileReader();
            fr.onload = function () {
                pending = fr.result;
                prev.style.backgroundImage = 'url("' + pending + '")';
                urlIn.value = '';
            };
            fr.readAsDataURL(f);
        };

        urlIn.oninput = function () {
            pending = this.value.trim();
            if (pending) prev.style.backgroundImage = 'url("' + pending.replace(/"/g, '\\"') + '")';
        };

        ov.querySelector('#arp-ok').onclick = function () {
            var v = pending || urlIn.value.trim();
            if (!v) { close(); return; }
            if (v === baseline[k]) { delete store[k]; img.setAttribute('src', v); }
            else { store[k] = { t: 'img', v: v, o: baseline[k] }; }
            saveLocal();
            applyStore();          // ayni gorselin carousel klonlarini da guncelle
            renderList();
            close();
            toast('Gorsel guncellendi.');
        };

        var rv = ov.querySelector('#arp-rv');
        if (rv) rv.onclick = function () {
            img.setAttribute('src', baseline[k] || '');
            delete store[k];
            saveLocal();
            renderList();
            close();
            toast('Gorsel orijinaline dondu.');
        };
    }

    /* ---------------------------------------------------------------- list */

    function renderList() {
        if (!panel) return;
        var keys = Object.keys(store);
        panel.querySelector('#arp-n-text').textContent = textNodes.length;
        panel.querySelector('#arp-n-img').textContent = imgNodes.length;
        panel.querySelector('#arp-n-chg').textContent = keys.length;
        panel.querySelector('#arp-chg-lbl').textContent = keys.length ? keys.length + ' kayit' : '';

        var box = panel.querySelector('#arp-list');
        if (!keys.length) {
            box.innerHTML = '<div class="arp-empty">Henuz degisiklik yok.<br>Duzenleme modunu acip sayfadaki metin ve gorsellere tiklayin.</div>';
            return;
        }
        box.innerHTML = '';
        keys.forEach(function (k) {
            var rec = store[k];
            var row = el('div', 'arp-item');
            var val = rec.t === 'img'
                ? (/^data:/.test(rec.v) ? 'Yuklenen gorsel (' + Math.round(rec.v.length / 1024) + ' KB)' : rec.v)
                : rec.v;
            row.innerHTML =
                '<div class="arp-item__main">' +
                '<span class="arp-item__tag">' + (rec.t === 'img' ? 'gorsel' : 'metin') + '</span>' +
                '<div class="arp-item__val">' + esc(val) + '</div></div>' +
                '<div class="arp-item__btns">' +
                '<button class="arp-mini" data-go="' + esc(k) + '">Git</button>' +
                '<button class="arp-mini" data-rv="' + esc(k) + '">Geri al</button></div>';
            box.appendChild(row);
        });

        Array.prototype.forEach.call(box.querySelectorAll('[data-go]'), function (b) {
            b.onclick = function () {
                var k = b.getAttribute('data-go');
                var n = document.querySelector('[data-arp-text="' + CSS.escape(k) + '"], [data-arp-img="' + CSS.escape(k) + '"]');
                if (n) n.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };
        });
        Array.prototype.forEach.call(box.querySelectorAll('[data-rv]'), function (b) {
            b.onclick = function () {
                var k = b.getAttribute('data-rv');
                restore(k, store[k]);
                delete store[k];
                saveLocal();
                renderList();
                toast('Geri alindi.');
            };
        });
    }

    /* ------------------------------------------------------ export/import */

    function doExport() {
        var json = JSON.stringify(store, null, 2);
        try {
            var blob = new Blob([json], { type: 'application/json' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'content.json';
            document.body.appendChild(a);
            a.click();
            setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        } catch (e) { /* indirme engellenirse asagidaki pencere yeter */ }

        var ov = el('div', 'arp-root arp-overlay');
        ov.innerHTML =
            '<div class="arp-dlg">' +
            '<h3>content.json</h3>' +
            '<p class="arp-dlg__sub">Dosya indirilmediyse asagidaki icerigi kopyalayip depodaki <code>content.json</code> dosyasina yapistirin.</p>' +
            '<textarea class="arp-textarea" id="arp-json" spellcheck="false"></textarea>' +
            '<div class="arp-row" style="margin-top:14px">' +
            '<button class="arp-btn arp-btn--primary" id="arp-copy">Kopyala</button>' +
            '<button class="arp-btn" id="arp-x2">Kapat</button></div></div>';
        document.body.appendChild(ov);
        ov.querySelector('#arp-json').value = json;
        ov.querySelector('#arp-x2').onclick = function () { ov.remove(); };
        ov.addEventListener('mousedown', function (e) { if (e.target === ov) ov.remove(); });
        ov.querySelector('#arp-copy').onclick = function () {
            var ta = ov.querySelector('#arp-json');
            ta.select();
            try { document.execCommand('copy'); toast('Panoya kopyalandi.'); }
            catch (e) { toast('Kopyalanamadi, elle secip kopyalayin.', true); }
        };
    }

    function doImport() {
        var ov = el('div', 'arp-root arp-overlay');
        ov.innerHTML =
            '<div class="arp-dlg">' +
            '<h3>Ice aktar</h3>' +
            '<p class="arp-dlg__sub">Daha once disa aktardiginiz JSON icerigini yapistirin.</p>' +
            '<textarea class="arp-textarea" id="arp-in" spellcheck="false" placeholder="{ ... }"></textarea>' +
            '<div class="arp-row" style="margin-top:14px">' +
            '<button class="arp-btn arp-btn--primary" id="arp-in-ok">Uygula</button>' +
            '<button class="arp-btn" id="arp-in-x">Vazgec</button></div></div>';
        document.body.appendChild(ov);
        ov.querySelector('#arp-in-x').onclick = function () { ov.remove(); };
        ov.addEventListener('mousedown', function (e) { if (e.target === ov) ov.remove(); });
        ov.querySelector('#arp-in-ok').onclick = function () {
            try {
                var data = JSON.parse(ov.querySelector('#arp-in').value);
                if (!data || typeof data !== 'object') throw new Error('bad');
                store = data;
                saveLocal();
                applyStore();
                renderList();
                ov.remove();
                toast('Icerik ice aktarildi.');
            } catch (e) {
                toast('Gecersiz JSON.', true);
            }
        };
    }

    function doReset() {
        if (!confirm('Tum degisiklikler silinip sayfa orijinal haline donecek. Onayliyor musunuz?')) return;
        Object.keys(store).forEach(function (k) { restore(k, store[k]); });
        store = {};
        saveLocal();
        renderList();
        toast('Tum degisiklikler sifirlandi.');
    }

    /* ------------------------------------------------------------- trigger */

    function bindTrigger() {
        var count = 0, timer = null;
        document.addEventListener('click', function (e) {
            var t = e.target;
            var hit = t.closest
                ? t.closest('.de-logo-wrapper a, .homepage-link, .footer-logo-link, .de-text-logo, .footer-full-logo')
                : null;
            if (!hit) return;
            e.preventDefault();
            e.stopPropagation();
            count++;
            clearTimeout(timer);
            if (count >= CFG.clicksNeeded) {
                count = 0;
                openLogin();
                return;
            }
            timer = setTimeout(function () { count = 0; }, CFG.clickWindow);
        }, true);
    }

    /* ---------------------------------------------------------------- init */

    function init() {
        loadLocal();
        loadContentFile(function () {
            indexPage();
            applyStore();
            bindTrigger();
            document.addEventListener('blur', onTextBlur, true);
            document.addEventListener('click', onPageClick, true);
            document.addEventListener('mouseover', onPageOver, true);
            if (sessionStorage.getItem(CFG.ssKey) === '1') {
                openPanel();
            }
            // carousel'ler slayt klonladiktan sonra yeniden indeksle ve uygula
            window.addEventListener('load', function () {
                setTimeout(refresh, 900);
                setTimeout(refresh, 2600);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
