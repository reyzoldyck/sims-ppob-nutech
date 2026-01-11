import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { resetProfileState } from "../../features/profile/profileSlice";
import { resetTransactionState } from "../../features/transaction/transactionSlice";
import { logout } from "../../features/auth/authSlice";
import { resetBalance } from "../../features/balance/balanceSlice";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    // OPTIONAL tapi DISARANKAN
    dispatch(resetProfileState());
    dispatch(resetBalance());
    dispatch(resetTransactionState());

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full border border-red-500 text-red-500 py-3 rounded-lg mt-4"
    >
      Logout
    </button>
  );
}
