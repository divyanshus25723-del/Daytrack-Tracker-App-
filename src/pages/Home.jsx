import React, { useMemo } from "react";

function Home({ activities = [] }) {
  const completed = activities.filter((task) => task.done).length;
  const total = activities.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const countsByCategory = useMemo(() => {
    return activities.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);

  const upcomingTasks = useMemo(() => {
    return activities
      .filter((task) => !task.done && task.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 3);
  }, [activities]);

  return (
    <section className="page home-page">
      <div className="hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>See your day at a glance.</h1>
          <p className="hero-copy">Track your energy, deadlines, and priorities in one beautiful workspace.</p>
        </div>
        <div className="hero-card">
          <span>{percent}%</span>
          <p>of your current tasks are complete.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{total - completed}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel panel-blur">
          <h2>Category breakdown</h2>
          <div className="category-list">
            {Object.entries(countsByCategory).length === 0 ? (
              <p className="empty-state">No categories yet.</p>
            ) : (
              Object.entries(countsByCategory).map(([category, count]) => (
                <div key={category} className="category-card">
                  <h4>{category}</h4>
                  <span>{count} tasks</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="panel panel-blur">
          <h2>Upcoming tasks</h2>
          {upcomingTasks.length === 0 ? (
            <p className="empty-state">No upcoming deadlines yet.</p>
          ) : (
            <ul className="upcoming-list">
              {upcomingTasks.map((task) => (
                <li key={task.id}>
                  <strong>{task.title}</strong>
                  <span>{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
