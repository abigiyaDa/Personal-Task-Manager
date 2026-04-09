import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Pages.css";
import type { Category } from "../types/types";

import {
  getCategories,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const navigate = useNavigate();

  // ✅ FETCH CATEGORIES
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

  // ✅ UPDATE CATEGORY
  const handleUpdate = async () => {
    if (!selectedCategory) return;
    try {
      await updateCategory(selectedCategory.id, selectedCategory.name + " Updated");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE CATEGORY
  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setSelectedCategory(updatedCategories[0] || null);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const goToEdit = () => {
    if (!selectedCategory) return;
    navigate("/add-category", { state: { category: selectedCategory } });
  };

  if (!selectedCategory) return <p>Loading...</p>;

  return (
    <Navbar>
      <div className="task-page">
        {/* LEFT: Category List */}
        <div className="category-list">
          <div className="category-list-header">
            <h3>Categories</h3>
            <button
              className="add-category-btn"
              onClick={() => navigate("/add-category")}
            >
              + Add New Category
            </button>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item ${
                category.id === selectedCategory.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <h4>{category.name}</h4>
            </div>
          ))}
        </div>

        {/* RIGHT: Category Details */}
        <div className="task-details">
          <h2>{selectedCategory.name}</h2>

          <div className="task-buttons">
            <button className="edit-btn" onClick={goToEdit}>
              Edit Category
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default CategoryPage;
