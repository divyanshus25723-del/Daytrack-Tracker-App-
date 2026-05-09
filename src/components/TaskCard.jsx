import React from "react";

function TaskCard({ task, onToggle, onDelete }) {
  const dueText = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "No due date";

  return (
    <article className={`card task-card ${task.done ? "done" : ""}`}>
      <div className="card-top">
        <span className={`pill category ${task.category.toLowerCase()}`}>{task.category}</span>
        <span className={`pill priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>

      <h3>{task.title}</h3>

      <div className="task-meta">
        <span>📅 {task.dueDate ? <time dateTime={task.dueDate}>{dueText}</time> : dueText}</span>
        <span>{task.done ? "Completed" : "In progress"}</span>
      </div>

      <div className="card-actions">
        <button
          type="button"
          aria-pressed={task.done ? "true" : "false"}
          onClick={() => onToggle(task.id)}
          aria-label={task.done ? `Mark ${task.title} as not completed` : `Mark ${task.title} as completed`}
        >
          {task.done ? "↺ Undo" : "✔ Complete"}
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => onDelete(task.id)}
          aria-label={`Remove ${task.title}`}
        >
          ✕ Remove
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
