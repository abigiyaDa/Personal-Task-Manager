import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import CategoryModal from "../components/CategoryModal";
import CategoryList from "../components/CategoryList";
import TaskPieChart from "../components/TaskPieChart";

import { getTasks } from "../api/taskApi";
import {
  getCategories,
  createCategory,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../api/categoryApi";

import type { Category, Task } from "../types/types";

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [taskData, categoryData] = await Promise.all([
        getTasks(),
        getCategories(),
      ]);

      setTasks(taskData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE
  const addCategory = async (name: string) => {
    try {
      const newCat = await createCategory(name);
      setCategories((prev) => [...prev, newCat]);
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deleteCategory = async (id: number) => {
    try {
      await deleteCategoryApi(id);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setEditingCategory(category);
      setShowModal(true);
    }
  };

  // UPDATE
  const updateCategoryName = async (name: string) => {
    if (!editingCategory) return;

    try {
      await updateCategoryApi(editingCategory.id, name);

      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name } : cat
        )
      );

      setEditingCategory(null);
    } catch (err) {
      console.error(err);
    }
  };

  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <Navbar>
      <div className="dashboard-content">
        <h2>Welcome back 👋</h2>

        <div className="dashboard-grid">
          <div className="left-panel">
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowModal(true);
              }}
              className="category-btn"
            >
              Categories
            </button>

            <CategoryList
              categories={categories}
              onDelete={deleteCategory}
              onEdit={openEditModal}
            />
          </div>

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
          onUpdate={updateCategoryName}
          editingCategory={editingCategory}
        />
      </div>
    </Navbar>
  );
};

export default Dashboard;