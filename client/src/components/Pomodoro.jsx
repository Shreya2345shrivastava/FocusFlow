import React, { useState, useEffect, useCallback } from "react";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  const savePomodoroSession = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pomodoro/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          completedAt: new Date(),
          duration: Math.round((25 * 60 - timeLeft) / 60), // minutes completed
        }),
      });
      const data = await res.json();
      console.log("Saved session:", data);
    } catch (err) {
      console.error("Failed to save session:", err);
    }
  }, [timeLeft]);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      clearInterval(timer);
      setIsRunning(false);
      const alarm = new Audio("/alarm.mp3");
      alarm.play();
      alert("⏰ Time's up!");
      savePomodoroSession(); // ✅ Save to backend
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, savePomodoroSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-semibold mb-4">Pomodoro Timer</h2>
      <div className="text-6xl font-mono mb-6">{formatTime(timeLeft)}</div>
      <div className="space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          onClick={() => setIsRunning(false)}
        >
          Pause
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(25 * 60);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
