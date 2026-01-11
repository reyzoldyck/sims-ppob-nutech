import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menu = [
    {
      name: "Top Up",
      path: "/topup",
    },
    {
      name: "Transaction",
      path: "/transaction",
    },
    {
      name: "Akun",
      path: "/profile",
    },
  ];

  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `text-lg md:text-sm font-medium transition py-4 md:py-0 ${
      isActive
        ? "text-white md:text-red-500 font-semibold"
        : "text-white/90 md:text-gray-600 hover:text-white md:hover:text-red-500"
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2" onClick={closeMenu}>
          <img
            src="/Logo.png"
            alt="logo"
            className="w-10 h-10 object-center object-cover"
          />
          <span className="font-semibold text-gray-800">SIMS PPOB</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {menu.map((item) => (
            <NavLink key={item.name} to={item.path} className={menuClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 z-50 relative ${
            isMenuOpen ? "fixed right-4 top-4" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2 bg-white" : "bg-gray-800"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? "opacity-0 bg-white" : "bg-gray-800"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2 bg-white" : "bg-gray-800"
            }`}
          ></span>
        </button>

        <div
          className={`fixed top-0 right-0 h-full w-full md:w-80 bg-red-600 z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <div className="flex flex-col items-start gap-2">
              {menu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full text-left text-xl font-medium py-4 px-4 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-700 text-white"
                        : "text-white/90 hover:bg-red-700/50"
                    }`
                  }
                  onClick={closeMenu}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-auto pb-8 text-center">
              <div className="text-white/80 text-[10px]">
                © 2026 SIMS PPOB - Muhammad Rhaihan Adzani
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeMenu}
          />
        )}
      </div>
    </header>
  );
}
