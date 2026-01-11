import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import {
  payment,
  resetTransactionState,
} from "../../features/transaction/transactionSlice";
import { fetchBalance, setBalance } from "../../features/balance/balanceSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchServices } from "../../features/services/serviceSlice";
import GreetingBalanceCard from "../../components/GreetingBalanceCard";
import TransactionModal from "../../components/TransactionModal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function PaymentPage() {
  const [modalType, setModalType] = useState<
    "confirm" | "success" | "fail" | null
  >(null);

  const { serviceCode } = useParams();

  const dispatch = useAppDispatch();

  const { balance } = useAppSelector((state) => state.balance);
  const { loading, success, error, message } = useAppSelector(
    (state) => state.transaction
  );

  const services = useAppSelector((state) => state.services.list);

  const service = services.find((s) => s.service_code === serviceCode);

  const isBalanceEnough = service && balance >= service.service_tariff;

  useEffect(() => {
    return () => {
      dispatch(resetTransactionState());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetTransactionState());
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetTransactionState());
    };
  }, [dispatch]);

  const handleConfirmPayment = () => {
    if (!service) return;

    setModalType(null);

    dispatch(payment(service.service_code)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(setBalance(res.payload.balance));
        setModalType("success");
      } else {
        setModalType("fail");
      }
    });
  };

  if (services.length === 0) {
    return <LoadingSpinner />;
  }

  if (!service) return <p>Service tidak ditemukan</p>;

  return (
    <div>
      <GreetingBalanceCard />

      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Pembayaran</h2>

        <p className="text-sm text-gray-500">Layanan</p>
        <div>
          <p className="font-medium mt-5">
            {" "}
            <div className="flex items-center gap-2">
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="w-12 h-12 object-cover rounded-xl"
              />
              {service.service_name}
            </div>
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-4">Tarif</p>
        <div className="flex items-center gap-2 border border-gray-200 py-3 px-4 rounded-lg mt-4">
          <span>💳</span>
          <p className="font-medium">
            Rp {service.service_tariff.toLocaleString("id-ID")}
          </p>
        </div>

        {!isBalanceEnough && (
          <p className="text-red-500 text-sm mt-3">Saldo tidak mencukupi</p>
        )}

        <button
          disabled={!isBalanceEnough || loading}
          onClick={() => setModalType("confirm")}
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          Bayar
        </button>

        {success && message && (
          <p className="text-green-600 text-sm mt-3">{message}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
      <TransactionModal
        open={modalType !== null}
        type={modalType || "confirm"}
        title={`Beli ${service.service_name} senilai`}
        amount={service.service_tariff}
        confirmText="Ya, lanjutkan Bayar"
        message={message || (error as string)}
        onConfirm={handleConfirmPayment}
        onClose={() => setModalType(null)}
      />
    </div>
  );
}
