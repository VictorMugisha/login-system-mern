import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";

export default function ProtectedRouteLayout() {
  const { loginAuth } = useAuthContext();
  return loginAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace={true}
      state={{ message: "You need to login first!" }}
    />
  );
}
