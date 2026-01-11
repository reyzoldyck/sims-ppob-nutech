import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServicesApi } from "./serviceService";
import type { ServiceItem } from "./serviceService";

interface ServiceState {
  list: ServiceItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getServicesApi();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil layanan"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;
