import api from "../../services/api";

export interface TopUpPayload {
  top_up_amount: number;
}

export interface TopUpResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

export interface PaymentPayload {
  service_code: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: "PAYMENT";
    total_amount: number;
    created_on: string;
    balance: number;
  };
}

export interface HistoryItem {
  id: string;
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  created_on: string;
}

export interface HistoryResponse {
  status: number;
  message: string;
  data: {
    offset: number;
    limit: number;
    records: HistoryItem[];
  };
}

export const topUpApi = async (
  payload: TopUpPayload
): Promise<TopUpResponse> => {
  const response = await api.post<TopUpResponse>("/topup", payload);
  return response.data;
};

export const paymentApi = async (
  payload: PaymentPayload
): Promise<PaymentResponse> => {
  const response = await api.post<PaymentResponse>("/transaction", payload);
  return response.data;
};

export const fetchHistoryApi = async (
  limit?: number
): Promise<HistoryResponse> => {
  const response = await api.get<HistoryResponse>(
    `/transaction/history${limit ? `?limit=${limit}` : ""}`
  );
  return response.data;
};
