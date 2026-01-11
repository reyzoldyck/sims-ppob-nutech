import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBannerApi } from "./bannerService";
import type { BannerItem } from "./bannerService";

interface BannerState {
  list: BannerItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getBannerApi();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil banner"
      );
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
