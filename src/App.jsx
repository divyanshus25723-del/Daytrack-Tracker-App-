import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Tracker from "./pages/Tracker.jsx";
import Reports from "./pages/Reports.jsx";
import About from "./pages/About.jsx";
import { useLocalStorageState } from "./hooks/useLocalStorageState.jsx";
import "./App.css";

function App() {
  const [activities, setActivities] = useLocalStorageState("daytrack-activities", []);

  const addActivity = (activity) => {
    setActivities((prev) => [
      ...prev,
      { ...activity, id: Date.now(), done: false }
    ]);
  };

  const toggleDone = (id) => {
    setActivities((prev) => prev.map((activity) =>
      activity.id === id ? { ...activity, done: !activity.done } : activity
    ));
  };

  const deleteActivity = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const clearCompleted = () => {
    setActivities((prev) => prev.filter((activity) => !activity.done));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home activities={activities} />} />
            <Route
              path="/tracker"
              element={
                <Tracker
                  activities={activities}
                  addActivity={addActivity}
                  toggleDone={toggleDone}
                  deleteActivity={deleteActivity}
                  clearCompleted={clearCompleted}
                />
              }
            />
            <Route path="/reports" element={<Reports activities={activities} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
