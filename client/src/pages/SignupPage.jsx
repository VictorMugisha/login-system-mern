import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";
import { BASE_API } from "../config";

export default function SignupPage() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const defaultErrors = {
    passwordsMatch: null,
    allFields: null,
    shortPassword: null,
    existingUser: null,
    serverError: null,
    randomError: null,
  };

  const [errors, setErrors] = useState(defaultErrors);

  const navigate = useNavigate();
  const { loginAuth } = useAuthContext();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleErrors(status, data) {
    switch (status) {
      case 400:
        return { allFields: data.message };
      case 401:
        return { shortPassword: data.message };
      case 402:
        return { existingUser: data.message };
      case 500:
        return { serverError: data.message };
      default:
        return {
          randomError: "An unexpected error occurred. Please try again.",
        };
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        passwordsMatch: "Passwords do not match!",
      }));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_API}/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const { status } = res;
      const data = await res.json();

      if (status !== 201) {
        const errorMessages = handleErrors(res.status, data);
        if (Object.keys(errorMessages).length > 0) {
          setErrors((currentErrors) => ({
            ...currentErrors,
            ...errorMessages,
          }));
          return;
        }
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginAuth) {
      navigate("/auth/home");
    }
  }, [loginAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Sign Up for MyApp
        </h2>
        {errors.passwordsMatch && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.passwordsMatch}
          </div>
        )}
        {errors.randomError && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.randomError}
          </div>
        )}
        {errors.existingUser && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.existingUser}
          </div>
        )}
        {errors.serverError && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.serverError}
          </div>
        )}
        {errors.allFields && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.allFields}
          </div>
        )}
        {errors.shortPassword && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.shortPassword}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>
          {loading ? (
            <button
              type="submit"
              disabled={true}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Processing...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          )}
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            <span className="pr-1">Go back to</span>
            <Link to="/" className="text-blue-600 hover:underline">
              Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
