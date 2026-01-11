import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import HomePage from "../pages/Home/HomePage";
import PrivateRoute from "./PrivateRoute";
import TopUpPage from "../pages/TopUp/TopUpPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import HistoryPage from "../pages/History/HistoryPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AppLayout from "../layouts/AppLayout";
import ProfileViewPage from "../pages/Profile/ProfileViewPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileViewPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/topup"
          element={
            <PrivateRoute>
              <TopUpPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment/:serviceCode"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
