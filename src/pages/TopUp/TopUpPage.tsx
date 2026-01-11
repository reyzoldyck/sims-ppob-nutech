import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  topUp,
  resetTransactionState,
} from "../../features/transaction/transactionSlice";
import { setBalance } from "../../features/balance/balanceSlice";
import GreetingBalanceCard from "../../components/GreetingBalanceCard";
import TransactionModal from "../../components/TransactionModal";

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopUpPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [modalType, setModalType] = useState<
    "confirm" | "success" | "fail" | null
  >(null);

  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.transaction
  );

  const isValidAmount =
    typeof amount === "number" && amount >= 10000 && amount <= 1000000;

  useEffect(() => {
    if (success) {
      dispatch(resetTransactionState());
    }
  }, [success, dispatch]);

  const handleConfirmTopUp = () => {
    setModalType(null);

    dispatch(topUp(amount as number)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(setBalance(res.payload.balance));
        setModalType("success");
      } else {
        setModalType("fail");
      }
    });
  };

  return (
    <div className="space-y-10">
      <GreetingBalanceCard />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <p className="font-semibold text-sm">Silahkan masukan</p>
            <h2 className="text-2xl font-bold">Nominal Top Up</h2>
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="Masukkan nominal Top Up"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            disabled={!isValidAmount || loading}
            onClick={() => setModalType("confirm")}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              isValidAmount
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Top Up
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && message && (
            <p className="text-green-600 text-sm">{message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 h-fit">
          {PRESET_AMOUNTS.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`border rounded-lg py-3 text-sm font-medium transition ${
                amount === value
                  ? "border-red-500 text-red-500"
                  : "hover:border-red-400 hover:text-red-500"
              }`}
            >
              Rp{value.toLocaleString("id-ID")}
            </button>
          ))}
        </div>
      </section>
      <TransactionModal
        open={modalType !== null}
        type={modalType || "confirm"}
        title="Anda yakin untuk Top Up sebesar"
        amount={amount as number}
        confirmText="Ya, lanjutkan Top Up"
        message={message || (error as string)}
        onConfirm={handleConfirmTopUp}
        onClose={() => setModalType(null)}
      />
    </div>
  );
}
