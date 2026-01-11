import clsx from "clsx";

interface Props {
  item: {
    id: string;
    description: string;
    transaction_type: "TOPUP" | "PAYMENT";
    total_amount: number;
    created_on: string;
  };
}

export default function TransactionItem({ item }: Props) {
  const isIncome = item.transaction_type === "TOPUP";

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p
          className={clsx(
            "font-semibold",
            isIncome ? "text-green-500" : "text-red-500"
          )}
        >
          {isIncome ? "+" : "-"} Rp {item.total_amount.toLocaleString("id-ID")}
        </p>
        <small className="text-gray-400">
          {new Date(item.created_on).toLocaleString("id-ID")}
        </small>
      </div>

      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  );
}
