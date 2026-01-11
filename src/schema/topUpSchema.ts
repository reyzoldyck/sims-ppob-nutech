import * as Yup from "yup";

const parseRupiahValue = (value: any): number => {
  if (typeof value === "string") {
    const cleanValue = value.replace(/[^\d]/g, "");
    return parseInt(cleanValue, 10) || 0;
  }
  return Number(value) || 0;
};

export const topUpSchema = Yup.object({
  amount: Yup.number()
    .transform((_, originalValue) => {
      return parseRupiahValue(originalValue);
    })
    .typeError("Nominal harus berupa angka")
    .required("Nominal wajib diisi")
    .min(10000, "Minimum Top Up Rp10.000")
    .max(1000000, "Maksimum Top Up Rp1.000.000")
    .test(
      "is-valid-amount",
      "Nominal harus antara Rp10.000 hingga Rp1.000.000",
      (value) => {
        return value >= 10000 && value <= 1000000;
      }
    ),
});
