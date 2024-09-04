import { useAuthContext } from "../../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div className="text-3xl font-semibold">
      This page is protected - Home <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
