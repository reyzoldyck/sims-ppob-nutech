import api from "../../services/api";

export interface ServiceItem {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServiceResponse {
  status: number;
  message: string;
  data: ServiceItem[];
}

export const getServicesApi = async (): Promise<ServiceResponse> => {
  const response = await api.get<ServiceResponse>("/services");
  return response.data;
};
