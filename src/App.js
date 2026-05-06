import React, { useState, useEffect } from "react";
import Tracker from "./pages/Tracker";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import About from "./pages/About";

function App() {
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem("activities");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity) => {
    setActivities((prev) => [
      ...prev,
      { ...activity, id: Date.now(), done: false }
    ]);
  };

  const toggleDone = (id) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, done: !a.done } : a
      )
    );
  };

  const deleteActivity = (id) => {
    setActivities((prev) =>
      prev.filter((a) => a.id !== id)
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Personal Tracker</h1>

      {/* 👇 Simple navigation (no router needed for now) */}
      <Home activities={activities} />
      <Tracker
        activities={activities}
        addActivity={addActivity}
        toggleDone={toggleDone}
        deleteActivity={deleteActivity}
      />
      <Reports activities={activities} />
      <About />
    </div>
  );
}

export default App;