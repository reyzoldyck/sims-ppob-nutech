import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfile } from "../../features/profile/profileSlice";
import LogoutButton from "../../components/auth/LogoutButton";

export default function ProfileViewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 text-center">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img
          src={
            data?.profile_image ===
            "https://minio.nutech-integrasi.com/take-home-test/null"
              ? "/Portrait_Placeholder.png"
              : (data?.profile_image as string)
          }
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold mb-8">
        {data?.first_name} {data?.last_name}
      </h2>

      <div className="space-y-4 text-left">
        <Input label="Email" value={data?.email} disabled />
        <Input label="Nama Depan" value={data?.first_name} disabled />
        <Input label="Nama Belakang" value={data?.last_name} disabled />
      </div>

      <button
        onClick={() => navigate("/profile/edit")}
        className="w-full bg-red-500 text-white py-3 rounded-lg mt-6"
      >
        Edit Profil
      </button>

      <LogoutButton />
    </div>
  );
}

function Input({ label, value, disabled }: any) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        value={value || ""}
        disabled={disabled}
        className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
      />
    </div>
  );
}
