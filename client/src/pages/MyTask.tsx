import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { tasks as dummyTasks } from "../data/dummyData";
import "../styles/Pages.css";
import type { Task } from "../types/types";

const MyTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const navigate = useNavigate();

  const toggleCompleted = () => {
  const updatedTasks = tasks.map((task): Task => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          status: task.status === "Completed" ? "In Progress" : "Completed",
        };
      }
      return task;
    });

    const updatedSelectedTask: Task = {
      ...selectedTask,
      status:
        selectedTask.status === "Completed"
          ? "In Progress"
          : "Completed",
    };

  setTasks(updatedTasks);
  setSelectedTask(updatedSelectedTask);
};

  const goToEdit = () => {
    navigate("/add-task", { state: { task: selectedTask } });
  };

  return (
    <Navbar>
      <div className="task-page">

        {/* LEFT - Task List */}
        <div className="task-list">
          <div className="task-list-header">
            <h3>My Tasks</h3>
            <button
              className="add-task-btn"
              onClick={() => navigate("/add-task")}
            >
              + Add New Task
            </button>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.id === selectedTask.id ? "active" : ""}`}
              onClick={() => setSelectedTask(task)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className={`status ${task.status === "Completed" ? "completed" : "progress"}`}>
                  {task.status}
                </span>
              </div>
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

          <div className="task-buttons">
            <button className="complete-btn" onClick={toggleCompleted}>
              {selectedTask.status === "Completed" ? "Undo" : "Mark Completed"}
            </button>
            <button className="edit-btn" onClick={goToEdit}>
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default MyTask;