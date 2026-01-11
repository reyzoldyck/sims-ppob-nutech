import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  paymentApi,
  topUpApi,
  fetchHistoryApi,
  type HistoryItem,
} from "./transactionService";

interface TransactionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;

  history: HistoryItem[];
  historyLoading: boolean;
}

const initialState: TransactionState = {
  loading: false,
  success: false,
  error: null,
  message: null,

  history: [],
  historyLoading: false,
};

export const topUp = createAsyncThunk(
  "transaction/topUp",
  async (amount: number, { rejectWithValue }) => {
    try {
      const res = await topUpApi({ top_up_amount: amount });
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Top up gagal");
    }
  }
);

export const payment = createAsyncThunk(
  "transaction/payment",
  async (serviceCode: string, { rejectWithValue }) => {
    try {
      const res = await paymentApi({ service_code: serviceCode });
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Transaksi gagal");
    }
  }
);

export const fetchHistory = createAsyncThunk(
  "transaction/fetchHistory",
  async (limit: number | undefined, { rejectWithValue }) => {
    try {
      const res = await fetchHistoryApi(limit);
      return res.data.records;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil history"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransactionState(state) {
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // TOP UP
      .addCase(topUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(topUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // PAYMENT
      .addCase(payment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(payment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // HISTORY
      .addCase(fetchHistory.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;
