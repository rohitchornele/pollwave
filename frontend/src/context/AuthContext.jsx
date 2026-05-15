import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true);

  /*
    ───────────────────────────────
    INIT AUTH
    ───────────────────────────────
  */

  useEffect(() => {

    let mounted = true;

    const initAuth = async () => {

      try {

        const storedUser = await authService.getUser();

        if (!storedUser) {

          if (mounted) {
            setLoading(false);
          }
          setUser(storedUser);

          return;
        }

        const response =
          await authService.getCurrentUser();

        const userData =
          response?.data?.user || response?.data || response;

        if (!mounted) return;

        setUser(userData);
        console.log("userdata = ", userData)

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

      } catch (error) {

        console.error(
          "Auth initialization failed:",
          error
        );

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");

        if (mounted) {
          setUser(null);
        }

      } finally {

        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };

  }, []);

  /*
    ───────────────────────────────
    LOGIN
    ───────────────────────────────
  */

  const login = async (credentials) => {

    const response =
      await authService.login(credentials);

    const userData =
      response?.user || response?.data || response;

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
console.log("auth contect response = ", response)
    return response;
  };

  /*
    ───────────────────────────────
    LOGOUT
    ───────────────────────────────
  */

  const logout = async () => {

    try {

      await authService.logout();

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    } finally {

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");

      setUser(null);

      navigate("/login", {
        replace: true,
      });
    }
  };

  /*
    ───────────────────────────────
    UPDATE USER
    ───────────────────────────────
  */

  const updateUser = useCallback((userData) => {

    const cleanData =
      userData?.user || userData;

    setUser(cleanData);

    if (cleanData) {

      localStorage.setItem(
        "user",
        JSON.stringify(cleanData)
      );

    } else {

      localStorage.removeItem("user");
    }

  }, []);

  /*
    ───────────────────────────────
    REFRESH USER
    ───────────────────────────────
  */

  const refreshUser = useCallback(async () => {

    try {

      const response =
        await authService.getCurrentUser();

      const userData =
        response?.user || response?.data || response;

      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      return userData;

    } catch (error) {

      console.error(
        "Failed to refresh user:",
        error
      );

      throw error;
    }

  }, []);

  /*
    ───────────────────────────────
    CONTEXT VALUE
    ───────────────────────────────
  */

  const value = {user, loading, login, logout, updateUser, refreshUser, isAuthenticated: !!user, isAdmin: user?.role === "admin" };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};