import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
} from "../../features/profile/profileSlice";

export default function ProfileEditPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading } = useAppSelector((state) => state.profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
    }
  }, [data]);

  const handleImageChange = (file: File) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Format harus JPG atau PNG");
      return;
    }

    setPreview(URL.createObjectURL(file));
    dispatch(uploadProfileImage(file));
  };

  const handleSubmit = () => {
    dispatch(updateProfile({ first_name: firstName, last_name: lastName }))
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

  return (
    <div className="max-w-xl mx-auto px-4 text-center">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img
          src={avatarSrc}
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

      <div className="space-y-4 text-left">
        <Input label="Email" value={data?.email} disabled />
        <Input label="Nama Depan" value={firstName} onChange={setFirstName} />
        <Input label="Nama Belakang" value={lastName} onChange={setLastName} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-red-500 text-white py-3 rounded-lg mt-6"
      >
        Simpan
      </button>
    </div>
  );
}

function Input({ label, value, onChange, disabled }: any) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full border rounded-lg px-4 py-2 mt-1 ${
          disabled ? "bg-gray-100" : ""
        }`}
      />
    </div>
  );
}
