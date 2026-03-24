import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { tasks } from "../data/dummyData";
import "../styles/Pages.css";
import type { Task } from "../types/types";

const MyTask: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);

  return (
    <Navbar>
      <div className="task-page">
        {/* LEFT - Task List */}
        <div className="task-list">
          <h3>My Tasks</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              className="task-item"
              onClick={() => setSelectedTask(task)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <span>Priority: {task.priority}</span>
              <span>Status: {task.status}</span>
            </div>
          ))}
        </div>

        {/* RIGHT - Task Details */}
        <div className="task-details">
          <h2>{selectedTask.title}</h2>
          <p><strong>Priority:</strong> {selectedTask.priority}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <p><strong>Created on:</strong> {selectedTask.createdAt}</p>
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
        </div>
      </div>
    </Navbar>
  );
};

export default MyTask;