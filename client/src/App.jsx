import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
