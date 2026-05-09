import React from "react";

const CATEGORY_OPTIONS = ["Work", "Study", "Fitness", "Personal"];
const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

function TaskForm({ title, category, priority, dueDate, onTitleChange, onCategoryChange, onPriorityChange, onDueDateChange, onSubmit }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="task-title">Task</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="What are you working on?"
          required
          aria-label="Task title"
        />
      </div>

      <div>
        <label htmlFor="task-category">Category</label>
        <select id="task-category" value={category} onChange={onCategoryChange} aria-label="Task category">
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-priority">Priority</label>
        <select id="task-priority" value={priority} onChange={onPriorityChange} aria-label="Task priority">
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-due">Due</label>
        <input id="task-due" type="date" value={dueDate} onChange={onDueDateChange} aria-label="Task due date" />
      </div>

      <button type="submit" className="primary" aria-label="Add task">Add task</button>
    </form>
  );
}

export default TaskForm;
