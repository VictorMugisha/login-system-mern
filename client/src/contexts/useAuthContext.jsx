import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext is missing provider!");
  }

  return context;
}
