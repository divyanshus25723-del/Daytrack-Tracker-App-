import React, { useState, useMemo } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";

const FILTER_OPTIONS = ["All", "Work", "Study", "Fitness", "Personal"];

function Tracker({ activities = [], addActivity, toggleDone, deleteActivity, clearCompleted }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    addActivity({ title: title.trim(), category, priority, dueDate });
    setTitle("");
    setDueDate("");
  };

  const visibleActivities = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return activities
      .filter((activity) =>
        (filter === "All" || activity.category === filter) &&
        activity.title.toLowerCase().includes(normalizedQuery)
      )
      .sort((a, b) => {
        if (a.done !== b.done) return a.done - b.done;
        if (!a.dueDate && b.dueDate) return 1;
        if (a.dueDate && !b.dueDate) return -1;
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      });
  }, [activities, filter, query]);

  const total = activities.length;
  const completed = activities.filter((activity) => activity.done).length;
  const pending = total - completed;

  return (
    <section className="page tracker-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Tracker</p>
          <h1>Build momentum every day.</h1>
          <p className="hero-copy">Create tasks with priority, due dates, and filters to focus on what matters.</p>
        </div>
        <div className="summary-block">
          <span>{total}</span>
          <p>Active tasks</p>
        </div>
      </div>

      <div className="tracker-grid">
        <div className="panel panel-glow">
          <h2>Add a new task</h2>
          <TaskForm
            title={title}
            category={category}
            priority={priority}
            dueDate={dueDate}
            onTitleChange={(e) => setTitle(e.target.value)}
            onCategoryChange={(e) => setCategory(e.target.value)}
            onPriorityChange={(e) => setPriority(e.target.value)}
            onDueDateChange={(e) => setDueDate(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="panel panel-glow">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="search">Search</label>
              <input
                id="search"
                type="search"
                placeholder="Search tasks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search tasks by title"
              />
            </div>

            <div className="filter-group">
              <label id="category-filter-label">Category</label>
              <div className="filter-buttons" role="group" aria-labelledby="category-filter-label">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={filter === option ? "pill active" : "pill"}
                    onClick={() => setFilter(option)}
                    aria-pressed={filter === option}
                    aria-label={`Filter by ${option} category`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card small">
              <p>Pending</p>
              <strong>{pending}</strong>
            </div>
            <div className="stat-card small">
              <p>Completed</p>
              <strong>{completed}</strong>
            </div>
            <div className="stat-card small">
              <p>Due soon</p>
              <strong>{activities.filter((activity) => {
                if (!activity.dueDate) return false;
                const due = new Date(activity.dueDate);
                const now = new Date();
                const diff = (due - now) / (1000 * 60 * 60 * 24);
                return diff >= 0 && diff <= 3;
              }).length}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="task-header">
        <h2>Task list</h2>
        <button type="button" className="secondary" onClick={clearCompleted} aria-label="Delete all completed tasks">
          Clear completed
        </button>
      </div>

      {visibleActivities.length === 0 ? (
        <div className="empty-card">
          <p>No tasks match your filters yet.</p>
        </div>
      ) : (
        <div className="list">
          {visibleActivities.map((activity) => (
            <TaskCard
              key={activity.id}
              task={activity}
              onToggle={toggleDone}
              onDelete={deleteActivity}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Tracker;
