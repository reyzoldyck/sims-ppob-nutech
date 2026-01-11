import api from "../../services/api";

export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
}

export const getProfileApi = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const updateProfileApi = async (payload: {
  first_name: string;
  last_name: string;
}) => {
  const res = await api.put("/profile/update", payload);
  return res.data;
};

export const uploadProfileImageApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  formData.get("file");

  const res = await api.put("/profile/image", formData);

  return res.data;
};
