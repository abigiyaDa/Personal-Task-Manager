import React from "react";
import type { Task } from "../types/types";
import "../styles/Pages.css"


interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4>{task.title}</h4>
        <span className={`status ${task.status === "Completed" ? "completed" : "progress"}`}>{task.status}</span>
      </div>
      <p>{task.description}</p>
      <p><strong>Category:</strong> {task.categoryName || "None"}</p>
      <small>Due: {task.dueDate}</small>
    </div>
  );
};

export default TaskCard;