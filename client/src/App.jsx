import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRouteLayout from "./layouts/ProtectedRoutesLayout";
import Home from "./pages/protected/Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/auth",
      element: <ProtectedRouteLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />;
    </AuthContextProvider>
  );
}
