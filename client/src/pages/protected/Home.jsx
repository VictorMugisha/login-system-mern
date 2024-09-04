import { useAuthContext } from "../../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Make sure this is the default import

export default function Home() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">MyApp</h1>
          <div className="flex items-center space-x-4">
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
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">Welcome to MyApp!</h2>
          <p className="text-gray-700">
            This is your protected homepage. You can manage your account, view
            personalized content, and explore more features from here.
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Manage Your Account
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  View Your Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Explore New Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 p-4 mt-auto">
        <div className="container mx-auto text-center text-white">
          &copy; 2024 MyApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
