import { useNavigate } from "react-router-dom";

interface TransactionModalProps {
  open: boolean;
  type: "confirm" | "success" | "fail";
  title?: string;
  amount?: number;
  confirmText?: string;
  message?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export default function TransactionModal({
  open,
  type,
  title,
  amount,
  confirmText,
  message,
  onConfirm,
  onClose,
}: TransactionModalProps) {
  if (!open) return null;
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl p-6 w-[320px] shadow-lg text-center space-y-4 z-10">
        {type === "confirm" ? (
          <img src="/Logo.png" alt="Logo" className="w-12 h-12 mx-auto" />
        ) : (
          <div
            className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white text-xl
      ${type === "success" ? "bg-green-500" : "bg-red-500"}
    `}
          >
            {type === "success" ? "✓" : "!"}
          </div>
        )}

        {type === "confirm" && (
          <>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold">
              Rp {amount?.toLocaleString("id-ID")} ?
            </p>

            <button
              onClick={onConfirm}
              className="w-full text-red-500 font-semibold"
            >
              {confirmText}
            </button>

            <button onClick={onClose} className="text-gray-400 text-sm">
              Batalkan
            </button>
          </>
        )}

        {type !== "confirm" && (
          <>
            <p className="text-sm text-gray-500">
              {type === "success" ? "Transaksi berhasil" : "Transaksi gagal"}
            </p>

            {message && <p className="font-semibold">{message}</p>}

            <button
              onClick={() => navigate("/")}
              className="w-full text-red-500 font-semibold"
            >
              Kembali ke Beranda
            </button>
          </>
        )}
      </div>
    </div>
  );
}
