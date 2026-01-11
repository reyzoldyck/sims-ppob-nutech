import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>

      <p className="text-xl font-semibold mt-4">Halaman tidak ditemukan</p>

      <p className="text-gray-500 mt-2">
        Maaf, halaman yang kamu cari tidak tersedia
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
