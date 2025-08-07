const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const signup = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Signup failed');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};

export const login = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Login failed');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};
