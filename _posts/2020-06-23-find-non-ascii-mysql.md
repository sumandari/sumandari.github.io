---
layout: post
title: "Non ASCII in MySQL"
date: 2020-06-23
---

<!--excerpt.start-->
### Bagaimana cara menemukan records yang di dalam nya terdapat Non ASCII character?

<!--excerpt.end-->

Saya menemukan jawabannya yang *work* untuk saya di [Stack Overflow](https://stackoverflow.com/questions/401771/how-can-i-find-non-ascii-characters-in-mysql/11741314)

saya memiliki tabel bernama tabelku, dengan kolom: nama, alamat, telp.

saya ingin mengetahui apakah terdapat record yang pada kolom alamat memilki character non ASCII.
```
SELECT * FROM tabelku WHERE alamat <> CONVERT(alamat USING ASCII)
```
  