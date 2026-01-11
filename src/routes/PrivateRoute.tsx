import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" replace />;
}
