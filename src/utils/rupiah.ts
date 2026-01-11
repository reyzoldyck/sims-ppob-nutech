export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const parseRupiah = (formattedValue: string): number => {
  const cleanValue = formattedValue.replace(/[^\d]/g, "");
  return parseInt(cleanValue, 10) || 0;
};
