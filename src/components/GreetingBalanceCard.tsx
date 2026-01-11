import { useState } from "react";
import { useAppSelector } from "../app/hooks";

interface GreetingBalanceCardProps {
  showGreeting?: boolean;
  showToggle?: boolean;
}

export default function GreetingBalanceCard({
  showGreeting = true,
  showToggle = true,
}: GreetingBalanceCardProps) {
  const { data: profile } = useAppSelector((state) => state.profile);
  const { balance, loading } = useAppSelector((state) => state.balance);

  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {showGreeting && (
        <div className="flex flex-col  gap-4">
          <img
            src={
              profile?.profile_image ===
              "https://minio.nutech-integrasi.com/take-home-test/null"
                ? "/Portrait_Placeholder.png"
                : (profile?.profile_image as string)
            }
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-semibold">Selamat datang,</p>
            <h2 className="text-xl font-bold">
              {profile?.first_name} {profile?.last_name}
            </h2>
          </div>
        </div>
      )}

      <div className="relative bg-[url('/BackgroundSaldo.png')] bg-cover bg-center rounded-xl text-white p-6 w-full max-w-md ml-auto">
        <p className="text-sm opacity-90">Saldo anda</p>

        <h2 className="text-2xl font-semibold mt-2">
          Rp{" "}
          {loading
            ? "..."
            : showBalance
            ? Number.isFinite(balance)
              ? balance.toLocaleString("id-ID")
              : "0"
            : "••••••"}
        </h2>

        {showToggle && (
          <button
            onClick={() => setShowBalance((prev) => !prev)}
            className="text-xs mt-3 opacity-90 hover:opacity-100"
          >
            {showBalance ? "Tutup Saldo" : "Lihat Saldo"} 👁
          </button>
        )}
      </div>
    </div>
  );
}
