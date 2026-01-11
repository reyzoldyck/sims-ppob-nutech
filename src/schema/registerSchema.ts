import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),

  first_name: Yup.string().required("Nama depan wajib diisi"),

  last_name: Yup.string().required("Nama belakang wajib diisi"),

  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});
