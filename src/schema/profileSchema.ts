import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstName: Yup.string()
    .required("Nama depan wajib diisi")
    .min(2, "Nama depan minimal 2 karakter")
    .max(50, "Nama depan maksimal 50 karakter"),
  lastName: Yup.string()
    .required("Nama belakang wajib diisi")
    .min(2, "Nama belakang minimal 2 karakter")
    .max(50, "Nama belakang maksimal 50 karakter"),
});
