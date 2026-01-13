import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  topUp,
  resetTransactionState,
} from "../../features/transaction/transactionSlice";
import { setBalance } from "../../features/balance/balanceSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { topUpSchema } from "../../schemas/topUpSchema";
import GreetingBalanceCard from "../../components/GreetingBalanceCard";
import TransactionModal from "../../components/TransactionModal";
import { formatRupiah, parseRupiah } from "../../utils/rupiah";

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopUpPage() {
  const [modalType, setModalType] = useState<
    "confirm" | "success" | "fail" | null
  >(null);

  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (success) {
      dispatch(resetTransactionState());
    }
  }, [success, dispatch]);

  const handleConfirmTopUp = (amount: number) => {
    setModalType(null);

    dispatch(topUp(amount)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(setBalance(res.payload.data.balance));
        setModalType("success");
      } else {
        setModalType("fail");
      }
    });
  };

  const handleCloseModal = () => {
    setModalType(null);
    dispatch(resetTransactionState());
  };

  return (
    <div className="space-y-10">
      <GreetingBalanceCard />

      <Formik
        initialValues={{ amount: "" }}
        validationSchema={topUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          const amount = parseRupiah(values.amount);
          if (amount >= 10000 && amount <= 1000000) {
            setModalType("confirm");
          }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isValid }) => {
          const amountNumber = parseRupiah(values.amount);
          const canSubmit =
            values.amount !== "" &&
            amountNumber >= 10000 &&
            amountNumber <= 1000000 &&
            isValid;

          return (
            <>
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <p className="font-semibold text-sm">Silahkan masukan</p>
                    <h2 className="text-2xl font-bold">Nominal Top Up</h2>
                  </div>

                  <Form className="space-y-4">
                    <div className="relative">
                      <Field name="amount" component={RupiahInput} />
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className={`w-full py-3 rounded-lg text-white font-semibold ${
                        canSubmit
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {loading ? "Memproses..." : "Top Up"}
                    </button>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && message && (
                      <p className="text-green-600 text-sm">{message}</p>
                    )}
                  </Form>
                </div>

                <div className="grid grid-cols-2 gap-4 h-fit">
                  {PRESET_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        const formatted = formatRupiah(value);
                        setFieldValue("amount", formatted);
                      }}
                      className={`border rounded-lg py-3 text-sm font-medium transition ${
                        amountNumber === value
                          ? "border-red-500 text-red-500"
                          : "hover:border-red-400 hover:text-red-500"
                      }`}
                    >
                      Rp{formatRupiah(value)}
                    </button>
                  ))}
                </div>
              </section>

              <TransactionModal
                open={modalType !== null}
                type={modalType || "confirm"}
                title="Anda yakin untuk Top Up sebesar"
                amount={amountNumber}
                confirmText="Ya, lanjutkan Top Up"
                message={message || (error as string)}
                onConfirm={() => handleConfirmTopUp(amountNumber)}
                onClose={handleCloseModal}
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}

const RupiahInput = ({ field, form, ...props }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const cleaned = input.replace(/[^\d]/g, "");
    const numValue = parseInt(cleaned, 10) || 0;

    const formatted = formatRupiah(numValue);

    form.setFieldValue(field.name, formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];

    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-700">Rp</span>
      </div>
      <input
        {...field}
        {...props}
        value={field.value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Masukkan nominal Top Up"
        className="w-full border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
};
