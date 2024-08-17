import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createItem, readItem, deleteItem } from "../utils/localStorage";
import { loginUser, registerStudent } from "../apis/user.api";
import {
  setCookie,
  removeCookie,
  EXPIRY_ACCESS_TOKEN,
  EXPIRY_REFRESH_TOKEN,
} from "../utils/cookie.utils";

// Define the shape of the AuthContext
const AuthContext = createContext({
  user: null,
  login: async (data) => false,
  registerStudent: async (data) => false,
  logout: () => {},
});

// Create AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = readItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (data) => {
    try {
      const response = await loginUser(data);

      // Check if response contains expected fields
      if (
        response &&
        response.user &&
        response.accessToken &&
        response.refreshToken
      ) {
        setUser(response.user);
        createItem("user", response.user);

        // Save tokens in cookies
        setCookie("accessToken", response.accessToken, EXPIRY_ACCESS_TOKEN);
        setCookie("refreshToken", response.refreshToken, EXPIRY_REFRESH_TOKEN);

        return {
          success: true,
          message: "Login successfully",
        };
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      // Log detailed error
      console.error("Login failed:", error);

      // Handle specific API error responses if available
      if (error.response) {
        // Server-side error (e.g., 4xx or 5xx status codes)
        return {
          success: false,
          message: error.response.data?.message || "Server error",
        };
      } else if (error.request) {
        // Network error (e.g., no response from the server)
        return {
          success: false,
          message: "Network error. Please try again later.",
        };
      } else {
        // Other errors
        return {
          success: false,
          message: error.message || "An unexpected error occurred.",
        };
      }
    }
  };

  const registerStudent = async (data) => {
    try {
      const response = await registerStudent(data);

      // Check if response contains expected fields
      if (
        response &&
        response.user &&
        response.accessToken &&
        response.refreshToken
      ) {
        setUser(response.user);
        createItem("user", response.user);

        // Save tokens in cookies
        setCookie("accessToken", response.accessToken, EXPIRY_ACCESS_TOKEN);
        setCookie("refreshToken", response.refreshToken, EXPIRY_REFRESH_TOKEN);

        return {
          success: true,
          message: "Register successfully",
        };
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      // Log detailed error
      console.error("Signup failed:", error);

      // Handle specific API error responses if available
      if (error.response) {
        // Server-side error (e.g., 4xx or 5xx status codes)
        return {
          success: false,
          message: error.response.data?.message || "Server error",
        };
      } else if (error.request) {
        // Network error (e.g., no response from the server)
        return {
          success: false,
          message: "Network error. Please try again later.",
        };
      } else {
        // Other errors
        return {
          success: false,
          message: error.message || "An unexpected error occurred.",
        };
      }
    }
  };

  const logout = () => {
    setUser(null);
    deleteItem("user");

    // Remove tokens from cookies
    removeCookie("accessToken");
    removeCookie("refreshToken");

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, registerStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
