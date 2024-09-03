import { AuthContext } from "./AuthContext";

export function useAuthContext() {
    if (!AuthContext) {
      throw new Error("AuthContext is missing provider!");
    }
  
    return AuthContext;
  }