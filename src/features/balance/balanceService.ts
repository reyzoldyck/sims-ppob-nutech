import api from "../../services/api";

export interface BalanceResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

export const getBalanceApi = async (): Promise<BalanceResponse> => {
  const response = await api.get<BalanceResponse>("/balance");
  return response.data;
};
