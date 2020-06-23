---
layout: post
title: "Pandas raise error when created database form SQL query fetchall"
date: 2020-06-22
---

<!--excerpt.start-->
## dataframe constructor not properly call! error. 


Ada beberapa cara untuk membuat dataframe dari query SQL. Metode yang disarankan oleh doc pandas adalah menggunakan method [read_sql](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_sql.html). 
Namun begitu, terkadang saran tersebut tidak dilakukan karena pertimbangan lain.
<!--excerpt.end-->

Misalnya sudah terdapat result query berupa fetchall dan akan merubah banyak line jika menggunakan read_sql.
Itu yang terjadi pada saya beberapa waktu yang lalu. 
Yang saya lakukan adalah :
```
df = pd.DataFrame(cur.fetchall())
```
Script tersebut berjalan baik di pandas 0.23, namun tidak di 0.24. Karena saya tidak melakukan best practice seperti menggunakan image (docker), maka enviormt development dan production tidak menggunakan versi yang sama. 

Dan saya menemukan error: 
**dataframe constructor not properly call! error**

setelah melakukan pencarian yang cukup lama di stack overflow, akhirnya saya mengambil solusi:
- mengubah cur.fetchall() yang semula berupa tupple menjadi list menggunakan built-in function list()
- membuat dataframe menggunakan list tersebut. Dari hasil googling beberapa pertanyaan dan jawab dari SO, dataframe sebaiknya di create dari list, bukan tuple. Tapi saya belum menemukan referensi dokumen yang bagus untuk mendukung pernyataan ini.

```
tuple_query_to_list = list(cur.fetchall())
df = pd.DataFrame(tuple_query_to_list)
```

Dan resolved. 

Kasus ini tentu saja akan berbeda dengan pengalaman orang lain. Lagi-lagi solusi ini saya ambil dengan mengesampingkan saran dari doc pandas karena saya memiliki pertimbangan lainnya. 
