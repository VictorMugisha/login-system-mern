import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  function login(token) {
    setToken(token);
    localStorage.setItem("authToken", JSON.stringify(token));
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("authToken");
  }

  const loginAuth = !!token;

  return (
    <AuthContext.Provider value={{ loginAuth, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
