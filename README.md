# SIMS PPOB - Front End Application

SIMS PPOB adalah aplikasi web Front End yang dikembangkan sebagai bagian dari **Test Praktek Front End Programmer – Departement SIMS**.  
Aplikasi ini mengimplementasikan fitur **PPOB (Payment Point Online Bank)** dengan integrasi API yang telah disediakan oleh Nutech Integrasi.

---

## 🚀 Demo

- 🔗 **Live Demo**: https://sims-ppob-rhaihan.vercel.app
- 🔗 **Repository**: https://github.com/reyzoldyck/sims-ppob-nutech

---

## 🔐 Akun Demo

Gunakan akun berikut untuk mencoba aplikasi:

- **Email**: rhaihan@nutech-integrasi.com
- **Password**: abcdef1234

---

## 📌 Fitur Aplikasi

- ✅ Registrasi User
- 🔐 Login & Session Management
- 👤 Lihat Profil
- ✏️ Update Data Profil
- 🖼️ Update Foto Profil
- 💰 Top Up Saldo
- 💳 Pembayaran Layanan
- 📜 Riwayat Transaksi (Pagination / Load More)

---

## 🛠️ Tech Stack

- **React.js**
- **Redux Toolkit** (State Management)
- **React Router**
- **Axios**
- **Tailwind CSS**
- **Vite**

---

## 📋 Requirement Implementasi

- Semua form memiliki **validasi input**
- Menggunakan **Redux Toolkit** untuk state management
- UI dikembangkan sesuai **mockup yang disediakan**
- Integrasi penuh dengan API yang telah ditentukan
- Session disimpan setelah login berhasil

---

## 📄 Detail Fitur & Endpoint

### 🔐 Registrasi

- Endpoint: `/registration`
- Semua field wajib diisi
- Menampilkan notifikasi sukses / gagal

### 🔑 Login

- Endpoint: `/login`
- Menyimpan token/session dari response API
- Redirect ke halaman utama setelah login berhasil

### 🏠 Halaman Utama

Menampilkan:

- Nama User → `/profile`
- Top UP → `/topup`
- Daftar Layanan → `/services/`
- Banner Slider → `/banner`

---

### 💰 Top Up Saldo

- Endpoint: `/topup`
- Minimum nominal: **Rp10.000**
- Maksimum nominal: **Rp1.000.000**
- Button akan disabled sebelum nominal dipilih

---

### 💳 Pembayaran

- Endpoint: `/payment/:serviceCode`
- Total pembayaran diambil dari data layanan (`/services`)

---

### 📜 Riwayat Transaksi

- Endpoint: `/transaction`
- Default: limit **5**, offset **0**
- Tombol **Show More** menggunakan rumus:
