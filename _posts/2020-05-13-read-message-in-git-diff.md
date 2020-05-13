---
layout: post
title: "Learning reading git diff Unified Format (unidiff)"
date: 2020-05-13
---

Reference: 
- [https://github.com/sumandari/git-diff](https://github.com/sumandari/git-diff)
- https://en.wikipedia.org/wiki/Diff#Unified_format
- https://www.git-tower.com/learn/git/ebook/en/command-line/advanced-topics/diffs

<!--excerpt.start-->
Following will be explained in Bahasa Indonesia, you can refer to links above to get the better tutorial in English


Tulisan ini hanya menjelaskan cara membaca pesan yang digenerate saat run **diff git** dan ditujukan untuk level beginer.
<!--excerpt.end-->

## 1. Mendapatkan file dan masuk ke direktori
```
git clone https://github.com/sumandari/git-diff
cd git-diff
```
## 2. Melakukan perubahan pada file
- buka file mengunakan text editor yang anda sukai
- edit beberapa bagian yang anda inginkan, atau melakukan hal yang sama persis dengan saya
### Perubahan yang saya lakukan:
- Pada awal paragraf tambahkan:
```
Perhatian, ini adalah paragraf
yang seharusnya ada pada document ini.
Dan berada di awal document.
```

- Hapus line 20 : Eget velit aliquet sagittis id consectetur.

- Edit line 32: kata **Liat** menjadi _Li**h**at_

- Menambahkan line pada akhir document, disini saya pada line 59:

```

Dan ini adalah paragraf
terakhir yang seharusnya ada.
```

## 3. Run command git diff
Jika anda sudah melakukan perubahan, namun belum run **git add**
```
git diff
```
atau lakukan git add terlebih dahulu
```
git add old_document.txt
git diff --staged
```
karena disini saya hanya membahas tentang cara membaca pesan, maka kita akan mengabaikan staged status dari file tersebut.


## 4. Membaca pesan
```
diff --git a/old_document.txt b/old_document.txt
```
- **a/old_document.txt** -> **a**: adalah path asal
- **b/old_document.txt** -> **b**: adalah path tujuan
- disini karena yang dirubah adalah isi file tanpa merubah direktori/path maka baik a atau pun b valuenya sama yaitu old_document.txt

### Index
```
index 9dc78b3..30f9d11 100644
```
- Baris tersebut merupakan metafile yang menunjukan hash SHA dari file asal dan file yang sudah dirubah.
- Anda bisa melihatnya dengan command berikut, tapi akan panjang.
```
git show 9dc78b3
```
adalah index file asal
```
git show 30f9d11
```
adalah index file yang sudah dirubah
- **100644** adalah an internal file mode identifier. Anda dapat membacanya pada link referensi di atas

### Marker
```
--- a/old_document.txt
+++ b/old_document.txt
```
- tanda **---** adalah marker untuk file original
- tanda **+++** adalah marker untuk file yang sudah dirubah

### Chunk Header
Jika anda melakukan perubahan yang sama persis dengan yang saya lakukan, maka anda akan mendapatkan 4 chunk header
```
@@ -1,3 +1,7 @@
```
```
@@ -13,7 +17,6 @@
```
```
@@ -26,7 +29,7 @@
```
```
@@ -52,3 +55,6 @@
```
- symbols @@ @@ menandakan bahwa ini adalah header dari chunk (potongan data)
- format header chunk : @@ -l,s +l,s @@
- *-* adalah penanda file original
- *+* adalah penanda file yang berubah
- l adalah start line
- s adalah end line

### Changes/Perubahan
- Lines setelah chunk header adalah perubahan yang terdapat pada chunk tersebut
- line yang diawali dengan *-* adalah original
- line yang diawali dengan *+* adalah perubahan yang terjadi
- line yang diawali dengan spasi (tidak terdapat tanda - ataupun +) adalah line yang tidak mengalami perubahan.

### Contoh membaca pesan
```
@@ -1,3 +1,7 @@
+Perhatian, ini adalah paragraf
+yang seharusnya ada pada document ini.
+Dan berada di awal document.
+
 Ini adalah bagian document
 yang sama dengan versi sebelumnya.
 Tidak dilakukan perubahan pada
```
- Empat lines pertama memiliki tanda + diawal, yang menunjukan bahwa mereka adalah perubahan yang terjadi pada file.
- Tiga lines selanjutnya tidak memiliki tanda + atau - diawal, melainkan spasi. hal ini menunjukan bahwa lines tersebut tidak berubah. Sama seperti pada file original
- @@ -1,3 +1,7 @@ : 
  - -1,3 adalah keterangan lines file original. Pesan lines setelah chunk header merupakan lines yang terdapat pada line 1 sampai line 3 di file original. Dalam hal ini adalah lines:
  - 
  ```
  Ini adalah bagian document
  yang sama dengan versi sebelumnya.
  Tidak dilakukan perubahan pada
  ```
  - seperti yang dijelaskan pada poin sebelum ini, spasi pada awal line menunjukan tidak terjadi perubahan. Jadi pada file original terdapat 3 lines diatas dan lines tersebut akan ditemukan juga pada file yamg dirubah.
  - +1,7 adalah keterangan file yang dirubah. Pesan lines setelah chunk header merupakan lines yang terdapat pada line 1 sampai line 7 di file yang dirubah. Kita bisa melihat pesan dengan tanda + diawal, yaitu :
  ```
  +Perhatian, ini adalah paragraf
  +yang seharusnya ada pada document ini.
  +Dan berada di awal document.
  +
  ```
 - terdapat empat lines baru dan tiga lines yang sama dengan yang ada pada lines sebelumnya. sehingga lines yang muncul pada pesan ada 7 lines. diawali dari line 1 sampai dengan line 7. itu adalah arti dari +1,7