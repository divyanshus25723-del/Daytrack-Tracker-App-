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
        />
      </div>

      <div>
        <label htmlFor="task-category">Category</label>
        <select id="task-category" value={category} onChange={onCategoryChange}>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-priority">Priority</label>
        <select id="task-priority" value={priority} onChange={onPriorityChange}>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-due">Due</label>
        <input id="task-due" type="date" value={dueDate} onChange={onDueDateChange} />
      </div>

      <button type="submit" className="primary">Add task</button>
    </form>
  );
}

export default TaskForm;
