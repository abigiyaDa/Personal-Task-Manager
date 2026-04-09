import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Pages.css";
import type { Task } from "../types/types";

import {
  getCategories,
  createCategory,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../api/categoryApi";

const Category: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  // ✅ FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      if (data.length > 0) setSelectedTask(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ TOGGLE STATUS (API)
  const toggleCompleted = async () => {
    if (!selectedTask) return;

    const newStatus =
      selectedTask.status === "Completed"
        ? "In Progress"
        : "Completed";

    try {
      await updateTask(selectedTask.id, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      await deleteTask(selectedTask.id);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);

      if (updatedTasks.length > 0) {
        setSelectedTask(updatedTasks[0]);
      } else {
        setSelectedTask(null);
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const goToEdit = () => {
    if (!selectedTask) return;
    navigate("/add-task", { state: { task: selectedTask } });
  };

  if (!selectedTask) return <p>Loading...</p>;

  return (
    <Navbar>
      <div className="task-page">
        {/* LEFT */}
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
              className={`task-item ${
                task.id === selectedTask.id ? "active" : ""
              }`}
              onClick={() => setSelectedTask(task)}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <div className="task-meta">
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span
                  className={`status ${
                    task.status === "Completed"
                      ? "completed"
                      : "progress"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="task-details">
          <h2>{selectedTask.title}</h2>
          <p><strong>Priority:</strong> {selectedTask.priority}</p>
          <p><strong>Category:</strong> {selectedTask.categoryName || "None"}</p>
          <p><strong>Status:</strong> {selectedTask.status}</p>
          <p><strong>Description:</strong> {selectedTask.description}</p>
          <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>

          <div className="task-buttons">
            <button className="complete-btn" onClick={toggleCompleted}>
              {selectedTask.status === "Completed"
                ? "Undo"
                : "Mark Completed"}
            </button>

            <button className="edit-btn" onClick={goToEdit}>
              Edit Task
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Category;