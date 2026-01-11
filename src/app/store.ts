import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import balanceReducer from "../features/balance/balanceSlice";
import bannerReducer from "../features/banner/bannerSlice";
import serviceReducer from "../features/services/serviceSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
    banner: bannerReducer,
    services: serviceReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
