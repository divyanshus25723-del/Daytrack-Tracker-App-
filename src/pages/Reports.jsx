import React, { useMemo } from "react";

function Reports({ activities = [] }) {
  const total = activities.length;
  const completed = activities.filter((task) => task.done).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const categories = useMemo(() => {
    return activities.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);

  const priorities = useMemo(() => {
    return activities.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);

  return (
    <section className="page reports-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>Your productivity insights.</h1>
          <p className="hero-copy">Measure your wins, overdue items, and what category deserves more attention.</p>
        </div>
      </div>

      <div className="stats-grid reports-stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>
        <div className="stat-card">
          <h3>Completion</h3>
          <p>{percent}%</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel panel-blur">
          <h2>By category</h2>
          <div className="category-list">
            {Object.entries(categories).length === 0 ? (
              <p className="empty-state">No category data yet.</p>
            ) : (
              Object.entries(categories).map(([category, count]) => (
                <article key={category} className="category-card" aria-label={`${count} tasks in ${category} category`}>
                  <h4>{category}</h4>
                  <span>{count} tasks</span>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="panel panel-blur">
          <h2>By priority</h2>
          <div className="category-list">
            {Object.entries(priorities).length === 0 ? (
              <p className="empty-state">No priority data yet.</p>
            ) : (
              Object.entries(priorities).map(([priority, count]) => (
                <article key={priority} className="category-card" aria-label={`${count} ${priority} priority tasks`}>
                  <h4>{priority}</h4>
                  <span>{count} tasks</span>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reports;
