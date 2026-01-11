import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { loginSchema } from "../../schema/loginSchema";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center px-8 md:px-20">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-8">
            <img src="/Logo.png" alt="Logo" />
            <span className="font-semibold text-lg">SIMS PPOB</span>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Masuk atau buat akun
            <br />
            untuk memulai
          </h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            await dispatch(login(values)).unwrap();
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <div className="relative">
                  <Field
                    name="email"
                    placeholder="masukan email anda"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">@</span>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="masukan password anda"
                    className="w-full border rounded-md px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    🔒
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-md text-white font-semibold mt-2
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }
                `}
              >
                {loading ? "Loading..." : "Masuk"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-center mt-6">
          belum punya akun?{" "}
          <Link to="/register" className="text-red-500 font-semibold">
            registrasi di sini
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
