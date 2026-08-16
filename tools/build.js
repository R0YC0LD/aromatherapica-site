/* ==========================================================================
   Aromatherapica - Tam derleme hatti
   --------------------------------------------------------------------------
   Adimlar sirayla calisir; sira onemlidir:

     1) homepage-products : ana sayfadaki urun kartlarina gercek katalog verisi
     2) build-categories  : magaza menusunu kurar, kategori sayfalarini uretir
     3) translate         : tum HTML dosyalarini Turkcelestirir

   1. adim eski urun adlarini aradigi icin index.html'in islenmemis halinden
   baslamalidir. Bu yuzden derleme oncesi git'ten temiz kopya alinir.

   Kullanim:  node tools/build.js
   ========================================================================== */
'use strict';

const { execFileSync } = require('child_process');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const ADIMLAR = [
    ['homepage-products.js', 'Ana sayfa urun karuseli'],
    ['build-categories.js', 'Magaza menusu ve kategori sayfalari'],
    ['translate.js', 'Turkcelestirme'],
    ['rename-tokens.js', 'Teknik isim temizligi'],
    ['clean-thirdparty.js', 'Olu ucuncu parti entegrasyonlar']
];

for (const [dosya, baslik] of ADIMLAR) {
    console.log('\n' + '='.repeat(64));
    console.log('  ' + baslik);
    console.log('='.repeat(64));
    execFileSync(process.execPath, [path.join(__dirname, dosya)], {
        cwd: ROOT, stdio: 'inherit'
    });
}

console.log('\n' + '='.repeat(64));
console.log('  Derleme tamamlandi');
console.log('='.repeat(64));
