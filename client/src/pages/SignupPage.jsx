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
              disabled
              type="button"
              className="w-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
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
