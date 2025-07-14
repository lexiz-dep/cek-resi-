# 📦 Cek Resi

**Cek Resi** adalah aplikasi web ringan untuk melacak status paket dari berbagai ekspedisi di Indonesia. Dibangun dengan HTML/CSS/JavaScript di frontend, dan sebuah API serverless (Vercel Functions) di backend menggunakan Node.js.

**Dibuat oleh: [Kaijesh](https://github.com/lexiz-dep)**  
**Channel WhatsApp Resmi:** 👉 [https://whatsapp.com/channel/0029VanrndJICVfcrjFr3x2R](https://whatsapp.com/channel/0029VanrndJICVfcrjFr3x2R)

---

## 🧐 Fitur

- **Lacak resi berbagai ekspedisi**:  
  - Shopee Express (`shopee-express`)  
  - Ninja Van (`ninja`)  
  - Lion Parcel (`lion-parcel`)  
  - Pos Indonesia (`pos-indonesia`)  
  - TIKI (`tiki`)  
  - ACommerce (`acommerce`)  
  - Gojek Logistics (`gtl-goto-logistics`)  
  - Paxel (`paxel`)  
  - SAP Express (`sap-express`)  
  - Indah Logistik Cargo (`indah-logistik-cargo`)  
  - Lazada Express (`lazada-express-lex`)  
  - Lazada Logistics (`lazada-logistics`)  
  - Janio Asia (`janio-asia`)  
  - JET Express (`jet-express`)  
  - PCP Express (`pcp-express`)  
  - PT NCS (`pt-ncs`)  
  - NSS Express (`nss-express`)  
  - Grab Express (`grab-express`)  
  - RCL Red Carpet Logistics (`rcl-red-carpet-logistics`)  
  - QRIM Express (`qrim-express`)  
  - ARK Xpress (`ark-xpress`)  
  - Standard Express LWE (`standard-express-lwe`)  
  - Bea Cukai Luar Negeri (`luar-negeri-bea-cukai`)  

- **Antarmuka modern & responsif** dengan gaya glassmorphism.  
- **API serverless** di folder `api/cekresi.js` yang menangani permintaan GET.  
- **Core scraping** di `cekresiCore.js` menggunakan Axios, Cheerio, Form-Data, dan CryptoJS untuk enkripsi parameter sesuai kebutuhan.

---

## 🚀 Demo

> Bisa diakses di URL Vercel milikmu, misalnya:  
> `https://cekresi-kaijesh.vercel.app`  
> Lalu buka halaman utama, masukkan nomor resi dan pilih ekspedisi, tekan **Lacak**.

---

## 🛠️ Teknologi

| Bagian        | Teknologi & Library           |
| ------------- | ----------------------------- |
| Frontend      | HTML5, CSS3, JavaScript       |
| Icon Font     | [Font Awesome](https://fontawesome.com/) |
| HTTP Client   | [Axios](https://github.com/axios/axios)  |
| HTML Parser   | [Cheerio](https://github.com/cheeriojs/cheerio) |
| Form Encoding | [form-data](https://github.com/form-data/form-data) |
| Encryption    | [CryptoJS](https://github.com/brix/crypto-js) |
| Deployment    | [Vercel](https://vercel.com/) |

---

## ⚙️ Instalasi & Menjalankan

1. **Clone repo**  
   ```bash
   git clone https://github.com/lexiz-dep/cek-resi.git
   cd cek-resi
