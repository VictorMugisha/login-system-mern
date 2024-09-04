import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the mobile menu
  const navigate = useNavigate();
  const { logout, token } = useAuthContext();

  // Decode the token to get the user's information
  const user = jwtDecode(token);

  // Handle logout and navigate to login page
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-blue-600 p-4 shadow-md mb-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">MyApp</h1>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Icon for hamburger menu */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center justify-between w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 text-white md:mr-4">
            <li>
              <Link to="/auth/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/auth/users" className="hover:underline">
                Users
              </Link>
            </li>
          </ul>

          {/* User Info and Logout */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <span className="text-white text-center md:text-left">
              Welcome, {user.firstName} {user.lastName}!
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
