import api from "../../services/api";

export interface BannerItem {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface BannerResponse {
  status: number;
  message: string;
  data: BannerItem[];
}

export const getBannerApi = async (): Promise<BannerResponse> => {
  const response = await api.get<BannerResponse>("/banner");
  return response.data;
};
