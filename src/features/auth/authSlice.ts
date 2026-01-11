import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "./authService";
import type { LoginPayload, RegisterPayload } from "./authService";

interface AuthState {
  token: string | null;
  message: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  message: null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  success: false,
  error: null,
};

export const login = createAsyncThunk<
  { token: string; message: string },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await loginApi(payload);

    return {
      token: res.data.token,
      message: res.message,
    };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login gagal");
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await registerApi(payload);
      console.log(res);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Register gagal");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.message = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    resetAuthState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login gagal";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
