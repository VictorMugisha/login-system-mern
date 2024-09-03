import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    }
  ]);
  return <RouterProvider router={router} />;
}
