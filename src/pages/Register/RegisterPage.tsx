import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register, resetAuthState } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../schemas/registerSchema";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const { loading, success, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetAuthState());
      }, 1500);
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center px-8 md:px-20">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <img src="/Logo.png" alt="Logo" />
            <span className="font-semibold text-lg">SIMS PPOB</span>
          </div>

          <h2 className="text-2xl font-bold text-center">
            Lengkapi data untuk
            <br />
            membuat akun
          </h2>
        </div>

        <Formik
          initialValues={{
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            dispatch(
              register({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password,
              })
            );
          }}
        >
          {({ isValid }) => (
            <Form className="space-y-4">
              <div>
                <div className="relative">
                  <Field
                    name="email"
                    placeholder="Email"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">@</span>
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    name="first_name"
                    placeholder="Nama Depan"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    👤
                  </span>
                </div>
                <ErrorMessage
                  name="first_name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    name="last_name"
                    placeholder="Nama Belakang"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    👤
                  </span>
                </div>
                <ErrorMessage
                  name="last_name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    🔒
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Konfirmasi Password"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    🔒
                  </span>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-xs mt-1 text-right"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full py-3 rounded-md text-white font-semibold
                  ${
                    !isValid || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }
                `}
              >
                {loading ? "Loading..." : "Registrasi"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center mt-6">
          sudah punya akun?{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            login di sini
          </Link>
        </p>
      </div>

      <div className="hidden md:flex items-center justify-center bg-pink-50">
        <img
          src="/IllustrasiLogin.png"
          alt="Illustrasi Login"
          className="max-w-md"
        />
      </div>
    </div>
  );
}
