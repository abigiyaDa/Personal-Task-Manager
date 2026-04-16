import {
  createCategoryRepo,
  getCategoriesRepo,
  updateCategoryRepo,
  deleteCategoryRepo,
  getCategoryByIdRepo,
} from "../repositories/categoryRepository.js";

export const createCategory = async (data, user) => {
  if (!data.name) throw new Error("Category name is required");

  const result = await createCategoryRepo(data.name, user.id);

  return {
    id: result.insertId,
    name: data.name,
  };
};

export const getCategories = async (user) => {
  const categories = await getCategoriesRepo(user.id);
  return categories;
};

export const updateCategory = async (id, data, user) => {
  if (!data.name) throw new Error("Category name is required");

  const result = await updateCategoryRepo(id, data.name, user.id);

  if (result.affectedRows === 0) {
    throw new Error("Category not found or unauthorized");
  }

  return { message: "Category updated successfully" };
};

export const deleteCategory = async (id, user) => {
  const result = await deleteCategoryRepo(id, user.id);

  if (result.affectedRows === 0) {
    throw new Error("Category not found or unauthorized");
  }

  return { message: "Category deleted successfully" };
};

// get category by id

export const getCategoryById = async (id, user) => {
  const category = await getCategoryByIdRepo(id, user.id);
  if (!category) throw new Error("Category not found");
  return category;
};