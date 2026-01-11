import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBalanceApi } from "./balanceService";

interface BalanceState {
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balance: 0,
  loading: false,
  error: null,
};

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getBalanceApi();
      return res.data.balance;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil saldo"
      );
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },

    resetBalance: (state) => {
      state.balance = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setBalance, resetBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
