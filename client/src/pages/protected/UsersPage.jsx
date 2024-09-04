import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  // Dummy fetch logic to simulate getting users from a database
  useEffect(() => {
    // Replace this with your actual fetch logic to get users from your backend
    const fetchUsers = async () => {
      // Simulated user data, replace with actual API call
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
  }, []);

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
