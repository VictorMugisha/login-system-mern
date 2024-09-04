/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";
import { BASE_API } from "../config";

export default function LoginPage() {
  const { login, loginAuth } = useAuthContext();
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const defaultErrors = {
    noAuth: null,
    shortPassword: null,
    incorrectPassword: null,
    invalidUsername: null,
    serverError: null,
    randomError: null,
  };
  const [errors, setErrors] = useState(defaultErrors);

  const location = useLocation();

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
        return { invalidUsername: data.message };
      case 401:
        return { incorrectPassword: data.message };
      case 500:
        return { serverError: data.message };
      default:
        return {
          randomError: "An unexpected error occurred. Please try again.",
        };
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(defaultErrors);

    // Basic Password Validation
    if (formData.password.length < 6) {
      setErrors((currentErrors) => {
        return {
          ...currentErrors,
          shortPassword: "Password must be atleast 6 characters!",
        };
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_API}/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
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

      // Success Codes
      login(data.token);
      navigate("/auth/home", {
        state: { message: "Login Successful" },
        replace: true,
      });
    } catch (error) {
      console.log(error);
      setErrors((currentErrors) => {
        return {
          ...currentErrors,
          randomError: error.message,
        };
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state) {
      setErrors((currentErrors) => {
        return {
          ...currentErrors,
          noAuth: location.state.message,
        };
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (loginAuth) {
      navigate("/auth/home");
    }
  }, [loginAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login to MyApp
        </h2>
        {errors.noAuth && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.noAuth}
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
        {errors.serverError && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.serverError}
          </div>
        )}
        {errors.incorrectPassword && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.incorrectPassword}
          </div>
        )}
        {errors.invalidUsername && (
          <div
            className="text-red-800 py-2 px-3 text-center w-full bg-red-200 mb-2"
            aria-live="assertive"
          >
            {errors.invalidUsername}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Username or Email"
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
              Login
            </button>
          )}
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
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
