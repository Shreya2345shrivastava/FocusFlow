const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getJournals = async (token) => {
  try {
    const res = await fetch(`${API_URL}/api/journals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Failed to fetch journals');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};

export const createJournal = async (journalData, token) => {
  try {
    const res = await fetch(`${API_URL}/api/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(journalData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Failed to create journal');
    return data;
  } catch (err) {
    return { error: err.message };
  }
};
