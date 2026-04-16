import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/category.css";

import type { Category, Task } from "../types/types";

import {
  getCategories,
  createCategory,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../api/categoryApi";

import { getTasksByCategory } from "../api/taskApi";

import TaskCard from "../components/TaskCard";
import CategoryModal from "../components/CategoryModal";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchTasks(selectedCategory.id);
    }
  }, [selectedCategory]);

  const fetchTasks = async (categoryId: number) => {
    try {
      const data = await getTasksByCategory(categoryId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE
  const addCategory = async (name: string) => {
    const newCat = await createCategory(name);
    setCategories((prev) => [...prev, newCat]);
  };

  // DELETE
  const deleteCategory = async (id: number) => {
    await deleteCategoryApi(id);
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    setSelectedCategory(updated[0] || null);
  };

  // OPEN EDIT
  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setShowModal(true);
  };

  // UPDATE
  const updateCategoryName = async (name: string) => {
    if (!editingCategory) return;

    await updateCategoryApi(editingCategory.id, name);

    setCategories(
      categories.map((c) =>
        c.id === editingCategory.id ? { ...c, name } : c
      )
    );

    setEditingCategory(null);
  };

  if (!selectedCategory) return <p>Loading...</p>;

  return (
    <Navbar>
      <div className="category-page">

        {/* LEFT */}
        <div className="category-list">
          <div className="category-header">
            <h3>Categories</h3>
            <button
              className="add-btn"
              onClick={() => {
                setEditingCategory(null);
                setShowModal(true);
              }}
            >
              + Add
            </button>
          </div>

          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`category-item ${
                selectedCategory.id === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="category-details">
          <h2>{selectedCategory.name}</h2>

          <div className="category-actions">
            <button
              className="edit-btn"
              onClick={() => openEditModal(selectedCategory)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteCategory(selectedCategory.id)}
            >
              Delete
            </button>
          </div>

          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="empty">No tasks in this category</p>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <CategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={addCategory}
        onUpdate={updateCategoryName}
        editingCategory={editingCategory}
      />
    </Navbar>
  );
};

export default CategoryPage;