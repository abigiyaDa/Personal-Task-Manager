// pages/Dashboard.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import CategoryModal from "../components/CategoryModal";
import CategoryList from "../components/CategoryList";
import TaskPieChart from "../components/TaskPieChart";
import type { Category, Task } from "../types/types";
import { tasks as dummyTasks, categories as dummyCategories } from "../data/dummyData";

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
const [tasks, setTasks] = useState<Task[]>(dummyTasks);

  const [showModal, setShowModal] = useState<boolean>(false);

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: Date.now(),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <Navbar>
      <div className="dashboard-content">
        <h2>Welcome back, Amanuel 👋</h2>

        <div className="dashboard-grid">
          {/* LEFT */}
          <div className="left-panel">
            <button onClick={() => setShowModal(true)} className="category-btn">
              Categories
            </button>

            <CategoryList
              categories={categories}
              onDelete={deleteCategory}
              onEdit={(id) => alert("Edit category " + id)}
            />
          </div>

          {/* RIGHT */}
          <div className="right-panel">
            <h3>Task Status</h3>
            <TaskPieChart
              completed={completedCount}
              inProgress={inProgressCount}
            />

            <h3>Completed Task</h3>
            {tasks
              .filter((t) => t.status === "Completed")
              .map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </div>

        <CategoryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={addCategory}
        />
      </div>
    </Navbar>
  );
};

export default Dashboard;