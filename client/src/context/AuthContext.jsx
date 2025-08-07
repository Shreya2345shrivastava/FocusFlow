
import React, { createContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Export the context for use in hooks
export { AuthContext };

// Export the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem("token");
      console.log('AuthContext - Checking auth status, stored token:', !!storedToken);
      
      if (storedToken) {
        try {
          // Verify token with backend
          const apiUrl = `${import.meta.env.VITE_API_URL}/api/profile`;
          console.log('AuthContext - Making request to:', apiUrl);
          
          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          console.log('AuthContext - Response status:', response.status);
          
          if (response.ok) {
            const userData = await response.json();
            console.log('AuthContext - User data received:', userData);
            setUser(userData);
            setToken(storedToken);
          } else {
            // Token is invalid, remove it
            console.log('AuthContext - Token invalid, removing');
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      } else {
        console.log('AuthContext - No stored token');
        setUser(null);
        setToken(null);
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (token, userData = null) => {
    setToken(token);
    setUser(userData || { token });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
