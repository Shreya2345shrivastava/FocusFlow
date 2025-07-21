
export const savePomodoroSession = async (duration, token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pomodoro/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ duration, completedAt: new Date() }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Failed to save session');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};
