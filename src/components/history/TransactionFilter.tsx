interface Props {
  selectedMonth: number | null;
  onChange: (month: number | null) => void;
}

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function TransactionFilter({ selectedMonth, onChange }: Props) {
  return (
    <div className="flex gap-4 text-sm text-gray-400 overflow-x-auto">
      {months.map((month, index) => {
        const monthNumber = index + 1;
        const active = selectedMonth === monthNumber;

        return (
          <button
            key={month}
            onClick={() => onChange(active ? null : monthNumber)}
            className={active ? "text-black font-semibold" : ""}
          >
            {month}
          </button>
        );
      })}
    </div>
  );
}
