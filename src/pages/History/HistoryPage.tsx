import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchHistory } from "../../features/transaction/transactionSlice";
import GreetingBalanceCard from "../../components/GreetingBalanceCard";
import TransactionFilter from "../../components/history/TransactionFilter";
import TransactionItem from "../../components/history/TransactionItem";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function HistoryPage() {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(5);
  const [month, setMonth] = useState<number | null>(null);

  const { history, historyLoading } = useAppSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchHistory(limit));
  }, [dispatch, limit]);

  // ✅ filtering by month
  const filteredHistory = useMemo(() => {
    if (!month) return history;

    return history.filter((item) => {
      const itemMonth = new Date(item.created_on).getMonth() + 1;
      return itemMonth === month;
    });
  }, [history, month]);

  return (
    <div>
      <GreetingBalanceCard />

      <h2 className="mt-8 mb-4 text-lg font-semibold">Semua Transaksi</h2>

      <TransactionFilter selectedMonth={month} onChange={setMonth} />

      {historyLoading && <LoadingSpinner />}

      {!historyLoading && filteredHistory.length === 0 && (
        <p className="text-center mt-10 text-gray-400">
          Maaf tidak ada histori transaksi saat ini
        </p>
      )}

      <div className="space-y-4 mt-6">
        {filteredHistory.map((item) => (
          <TransactionItem key={item.invoice_number} item={item} />
        ))}
      </div>

      {filteredHistory.length >= limit && (
        <div className="text-center mt-6">
          <button
            onClick={() => setLimit((prev) => prev + 5)}
            className="text-red-500 font-medium"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
