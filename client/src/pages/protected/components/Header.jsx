import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/useAuthContext";
import { jwtDecode } from "jwt-decode";

export default function Header() {
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
        <h1 className="text-white text-2xl font-bold">MyApp</h1>
        <nav className="flex items-center justify-start gap-4">
          <ul className="flex items-center justify-start gap-4 text-white">
            <li>
              <Link to="/auth/home">Home</Link>
            </li>
            <li>
              <Link to="/auth/users">Users</Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4 pl-6  font-semibold">
            <span className="text-white">
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
