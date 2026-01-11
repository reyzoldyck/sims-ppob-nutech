import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchProfile } from "../features/profile/profileSlice";
import { fetchBalance } from "../features/balance/balanceSlice";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="px-6 py-4 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
