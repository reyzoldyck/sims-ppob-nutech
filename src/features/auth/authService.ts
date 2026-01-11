import api from "../../services/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
}

export interface RegisterPayload {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", payload);
  return response.data;
};

export const registerApi = async (payload: RegisterPayload) => {
  const res = await api.post("/registration", payload);
  return res.data;
};
