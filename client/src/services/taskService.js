const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getTasks = async (token) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Failed to fetch tasks');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};

export const createTask = async (taskData, token) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Failed to create task');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};
