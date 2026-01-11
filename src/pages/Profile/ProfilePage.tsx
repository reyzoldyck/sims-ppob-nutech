import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
} from "../../features/profile/profileSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingSpinner from "../../components/LoadingSpinner";
import { profileSchema } from "../../schemas/profileSchema";

export default function ProfileEditPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading } = useAppSelector((state) => state.profile);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleImageChange = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Format harus JPG atau PNG");
      return;
    }

    setPreview(URL.createObjectURL(file));
    dispatch(uploadProfileImage(file));
  };

  const handleSubmit = (values: { firstName: string; lastName: string }) => {
    dispatch(
      updateProfile({
        first_name: values.firstName,
        last_name: values.lastName,
      })
    )
      .unwrap()
      .then(() => navigate("/profile"));
  };

  const avatarSrc =
    preview ||
    (data?.profile_image &&
    data.profile_image !==
      "https://minio.nutech-integrasi.com/take-home-test/null"
      ? data.profile_image
      : "/Portrait_Placeholder.png");

  if (!data) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 text-center">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img
          src={avatarSrc}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />

        <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
          ✏️
          <input
            type="file"
            accept="image/png,image/jpeg"
            hidden
            onChange={(e) =>
              e.target.files && handleImageChange(e.target.files[0])
            }
          />
        </label>
      </div>

      <h2 className="text-xl font-semibold mb-8">
        {data?.first_name} {data?.last_name}
      </h2>

      <Formik
        initialValues={{
          firstName: data.first_name || "",
          lastName: data.last_name || "",
        }}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 text-left">
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <Field
                as="input"
                name="email"
                value={data?.email}
                disabled
                className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="firstName" className="text-sm text-gray-500">
                Nama Depan
              </label>
              <Field
                id="firstName"
                name="firstName"
                placeholder="Masukkan nama depan"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="text-sm text-gray-500">
                Nama Belakang
              </label>
              <Field
                id="lastName"
                name="lastName"
                placeholder="Masukkan nama belakang"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-full py-3 rounded-lg text-white font-semibold mt-6 ${
                isSubmitting || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isSubmitting || loading ? "Menyimpan..." : "Simpan"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
