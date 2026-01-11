import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-red-500 font-semibold"
        : "text-gray-600 hover:text-red-500"
    }`;

  return (
    <header className="w-full border-b bg-white sticky top-0 z-999">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="logo"
            className="w-10 object-center object-cover"
          />
          <span className="font-semibold text-gray-800">SIMS PPOB</span>
        </Link>

        <nav className="flex gap-8">
          <NavLink to="/topup" className={menuClass}>
            Top Up
          </NavLink>

          <NavLink to="/transaction" className={menuClass}>
            Transaction
          </NavLink>

          <NavLink to="/profile" className={menuClass}>
            Akun
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
