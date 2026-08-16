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
4. Herhangi bir **gorsele veya videoya tiklayin** - bilgisayarinizdan dosya secebilir
   veya adres yapistirabilirsiniz.
5. Degisiklikler aninda kaydedilir; panelde listelenir ve tek tek geri alinabilir.

### Medya: gorsel ve video

Her medya yuvasi **her iki turu de** kabul eder. Desteklenen uzantilar:

| Gorsel | Video |
|---|---|
| jpg, jpeg, png, gif, webp, avif, svg, bmp | mp4, webm, ogv, mov, m4v |

Yuva turu icerige gore **otomatik** ayarlanir: bir gorsel yuvasina `.mp4` verirseniz
eleman `<video autoplay loop muted playsinline>` olarak yeniden olusturulur; bir video
yuvasina `.jpg` verirseniz `<img>` olur. Sinif, olcu ve yerlesim korunur.

### Dosyayi elle degistirirken dikkat

Depodaki bir dosyayi GitHub uzerinden degistirirken **uzantiyi mutlaka koruyun**.
Bu projedeki bazi dosya adlari zaten `-compress-jpg` gibi ekler icerdiginden
karistirmak kolaydir:

```
DOGRU : KamoHPHeroBanner-Big-ezgif.com-compress-jpg.jpg
YANLIS: KamoHPHeroBanner-Big-ezgif.com-compress-jpg        <- .jpg eksik, site 404 alir
```

Adres ve uzantilar **buyuk/kucuk harfe duyarlidir** (`.JPG` ile `.jpg` farklidir).
Dosyayi degistirdikten sonra sayfayi **Ctrl+Shift+R** ile sert yenileyin; aksi halde
tarayici eski gorseli onbellekten gosterir.

En kolay yol: dosyayi elle degistirmek yerine **yonetim panelinden** gorsele tiklayip
bilgisayardan secmek.

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

## Derleme

Site `data/catalog.json` (138 urun, 18 kategori) uzerinden uretilir.
Tek komut tum adimlari sirayla calistirir:

```bash
node tools/build.js
```

| Adim | Dosya | Isi |
|---|---|---|
| 1 | `tools/import-xlsx.js` | `data/urunler.xlsx` (Ticimax disa aktarimi) -> `data/catalog.json` |
| 2 | `tools/homepage-products.js` | Ana sayfa urun kartlarina ve hero gorsellerine gercek katalog verisi |
| 3 | `tools/build-categories.js` | Magaza menusunu kategori agacina baglar, kategori sayfalarini uretir |
| 4 | `tools/translate.js` | Tum HTML dosyalarini Turkcelestirir, `lang="tr"` yapar |
| 5 | `tools/rename-tokens.js` | Eski markadan kalan CSS sinifi / ID adlarini HTML+CSS+JS'te esgudumlu yeniler |
| 6 | `tools/clean-thirdparty.js` | Calismayan ucuncu parti entegrasyonlari cikarir |

Sablonun Turkce icerikle bozulan yerleri `css/site-fixes.css` ile duzeltilir;
bundle'lara dokunulmaz.

### Yazi tipi notu

Sablonun kendi fontlari Latin-1 alt kumesidir ve Turkce karakterleri tam
tasimaz:

| Font | Eksik karakterler |
|---|---|
| Brown ailesi (govde) | `ğ Ğ ş Ş ı İ` |
| Sainte Colombe (baslik) | Turkce karakterlerin tamami |

Bu yuzden "Yagları" gibi kelimeler kelime ortasinda baska bir yazi tipine
dusuyordu. Govde ve basliklar, gorunum olarak yakin ve Turkce destegi tam olan
sistem fontlarina alindi (`Segoe UI` / `Georgia` yigini). Marka adi salt Latin
oldugundan logo Brown ile kalir.

Ayrica `fonts/BrownRegular.woff2|woff|ttf|eot` dosyalarinin dordu de aslinda
HTML hata sayfasiydi (kazima sirasinda font inmemis); font hic yuklenmiyordu.
Gercek dosyalarla (`BrownRegular_1.*`) degistirildi.

> **Onemli:** 1. adim eski urun adlarini aradigi icin derleme, `index.html`'in
> islenmemis (git'teki) halinden baslamalidir:
>
> ```bash
> git checkout -- index.html && node tools/build.js
> ```

### Urun ve kategori guncelleme

Ticimax'ten yeni urun listesi disari aktardiginizda `data/urunler.xlsx`
dosyasini degistirip derlemeyi calistirmak yeterlidir. Kategori agaci
`BREADCRUMBKAT` sutunundan otomatik kurulur ("Ust>Ara>Alt" bicimi, uc seviyeye
kadar); yeni bir kategori gorulurse sayfasi kendiliginden acilir.

Kategori sayfalari, magaza menusu ve ana sayfa vitrini otomatik guncellenir.

### Urun gorselleri

Gorseller `catalog.json` icindeki `imageUrl` alanindan gelir ve ice aktarim
sirasinda urun adina gore korunur; yani `urunler.xlsx` yenilendiginde mevcut
gorseller kaybolmaz.

Gorseli olmayan urunler icin `images/ingredients/` altindaki icerik gorselleri
ad eslesmesiyle kullanilir (ornegin "Hint Yagi" -> `hint.svg`); eslesme yoksa
`images/product-placeholder.svg` gosterilir. Gercek urun fotograflari
eklendikce `catalog.json` icindeki `imageUrl` alanlari doldurulabilir.

Urun gorselleri Ticimax CDN'inden gelir (`imageUrl`). Gorseli olmayan urunler
icin `images/ingredients/` altindaki icerik gorselleri ad eslesmesiyle
kullanilir; eslesme yoksa `images/product-placeholder.svg` gosterilir.

### Linkler

Menu ve footer linkleri uretilen yerel sayfalara baglanir; yerel karsiligi
olmayan tum ic yollar ana sayfaya dusurulur, boylece hicbir tiklama 404 vermez.

## Dosya yapisi

```
index.html            tek sayfalik site
content.json          yayindaki icerik gecersiz kilmalari (panelden uretilir)
css/admin-panel.css   panel stilleri (.arp- onekiyle izole)
js/admin-panel.js     panel mantigi
css/ js/ fonts/       sitenin mevcut varliklari
images/ media/        gorseller ve video
```
