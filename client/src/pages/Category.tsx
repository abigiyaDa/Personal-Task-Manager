import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Pages.css";
import type { Category } from "../types/types";
import "../styles/category.css";

import {
  getCategories,
  createCategory,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../api/categoryApi";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
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

  // // ✅ UPDATE CATEGORY
  // const handleUpdate = async () => {
  //   if (!selectedCategory) return;
  //   try {
  //     await updateCategoryApi(selectedCategory.id, selectedCategory.name + " Updated");
  //     fetchCategories();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // ✅ DELETE CATEGORY
  // const handleDelete = async () => {
  //   if (!selectedCategory) return;
  //   try {
  //     await deleteCategoryApi(selectedCategory.id);
  //     const updatedCategories = await getCategories();
  //     setCategories(updatedCategories);
  //     setSelectedCategory(updatedCategories[0] || null);
  //   } catch (err) {
  //     console.error("Failed to delete category:", err);
  //   }
  // };

  const goToEdit = () => {
    if (!selectedCategory) return;
    navigate("/add-category", { state: { category: selectedCategory } });
  };

  if (!selectedCategory) return <p>Loading...</p>;
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

  return (
    <Navbar>
      <div className="category-page">
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
            <button
              onClick={() => {
                setEditingCategory(null);
                setShowModal(true);
              }}
              className="category-btn"
            >
              Categories
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
        <div className="category-details">
          <h2>{selectedCategory.name}</h2>

          <div className="category-buttons">
            <button className="edit-btn" onClick={goToEdit}>
              Edit Category
            </button> 
            <button className="delete-btn" onClick={() => deleteCategory(selectedCategory.id)}>
              Delete Category
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default CategoryPage;
