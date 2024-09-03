import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem("token")) | null;
  });

  function login(token) {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
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
