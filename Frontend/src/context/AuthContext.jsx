import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setError(null);
        // Check if user is admin
        const adminResponse = await axios.get("http://localhost:4000/api/v1/user/admin/me", {
          withCredentials: true,
        });
        
        if (adminResponse.data.user) {
          setUser(adminResponse.data.user);
          return;
        }
      } catch (error) {
        // If not admin, check if user is patient
        try {
          const patientResponse = await axios.get(
            "http://localhost:4000/api/v1/user/patient/me",
            {
              withCredentials: true,
            }
          );
          if (patientResponse.data.user) {
            setUser(patientResponse.data.user);
          }
        } catch (error) {
          if (error.response?.status !== 401) {
            console.error("Authentication error:", error);
            setError("Error checking authentication status");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    try {
      setError(null);
      setUser(userData);
      toast.success("Login successful!");
    } catch (error) {
      setError("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const endpoint = user?.role === "Admin" 
        ? "http://localhost:4000/api/v1/user/admin/logout"
        : "http://localhost:4000/api/v1/user/patient/logout";

      await axios.post(endpoint, {}, {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Error during logout");
      toast.error("Error during logout");
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 