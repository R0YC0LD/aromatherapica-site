# Aromatherapica

Statik web sitesi (tek sayfa) + tarayici uzerinden calisan icerik duzenleme paneli.

## Calistirma

Herhangi bir statik sunucu yeterli. Ornek:

```bash
npx serve -l 4321 .
```

Ardindan `http://localhost:4321` adresini acin.

> `index.html` dosyasini dogrudan cift tiklayarak (`file://`) acarsaniz tarayici
> guvenlik kisitlari nedeniyle bazi kaynaklar ve `content.json` yuklenmez.
> Mutlaka bir sunucu uzerinden acin.

## Yonetim paneli

| | |
|---|---|
| **Acilis** | Header veya footer'daki **Aromatherapica** logosuna arka arkaya **4 kez** tiklayin |
| **Kullanici adi** | `admin` |
| **Sifre** | `admin12345` |

### Kullanim

1. Logoya 4 kez tiklayip giris yapin - panel sagdan acilir.
2. **Duzenleme modu**nu acin.
3. Sayfadaki herhangi bir **metne tiklayip** dogrudan yazin.
4. Herhangi bir **gorsele tiklayin** - dosya yukleyebilir veya gorsel adresi yapistirabilirsiniz.
5. Degisiklikler aninda kaydedilir; panelde listelenir ve tek tek geri alinabilir.

### Degisiklikleri yayina alma

Panel degisiklikleri once **yalnizca o tarayicinin** `localStorage` alanina yazar.
Yani yaptiginiz duzenlemeyi baska bir cihazdan giren ziyaretci gormez.

Herkesin gormesi icin:

1. Panelden **Disa aktar**'a basin - `content.json` iner
   (inmezse acilan pencereden icerigi kopyalayin).
2. Bu dosyayi depodaki `content.json` ile degistirip commit edin.
3. Sayfa acilirken `content.json` okunur ve icerik herkes icin guncellenmis olur.

Oncelik sirasi: `localStorage` (sizin yerel duzenlemeniz) > `content.json` (yayindaki icerik).
Kendi tarayicinizda yayindaki hali gormek icin panelden **Tumunu sifirla** deyin.

## Guvenlik notu

Bu tamamen statik bir sitedir, sunucu tarafi yoktur. Giris bilgisi
`js/admin-panel.js` icinde acik metin olarak durur ve siteyi ziyaret eden herkes
kaynak koddan gorebilir. Bu nedenle panel **gercek bir erisim korumasi degildir**;
yalnizca panelin kazara acilmasini engeller.

Gercek koruma gerekiyorsa sunucu tarafi kimlik dogrulamasi olan bir cozume
(ornegin Netlify Identity, Cloudflare Access veya git tabanli bir CMS) gecilmelidir.

## Dosya yapisi

```
index.html            tek sayfalik site
content.json          yayindaki icerik gecersiz kilmalari (panelden uretilir)
css/admin-panel.css   panel stilleri (.arp- onekiyle izole)
js/admin-panel.js     panel mantigi
css/ js/ fonts/       sitenin mevcut varliklari
images/ media/        gorseller ve video
```
