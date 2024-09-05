import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BASE_API } from "../../config";
import { useAuthContext } from "../../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { token, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_API}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.status !== 200) {
          const errorMessage = data.message;
          console.log(errorMessage)
          if (errorMessage === "Token has expired!") {
            console.log(errorMessage)
            // Try to get another refresh token
            const refreshTokenResponse = await fetch(
              `${BASE_API}/refresh-token`,
              {
                method: "POST",
                credentials: "include",
              }
            );

            if (!refreshTokenResponse.ok) {
              logout();
              navigate("/login");
            }

            const data = await refreshTokenResponse.json();
            const accessToken = data.token;
            localStorage.setItem("authToken", accessToken);
            console.log("Using refresh token!")
            location.reload()
          }
          return;
        }

        console.log(data);
        setUsers(data)
      } catch (error) {
        console.error(error);
      }
      const data = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          username: "john123",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          username: "jane456",
        },
        // Add more dummy users here...
      ];
      setUsers(data);
    };

    fetchUsers();
  }, [token, logout, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto flex-grow">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                    First Name
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Last Name
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-700">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {user.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {user.firstName}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {user.lastName}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {user.username}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
