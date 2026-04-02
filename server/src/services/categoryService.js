import {
  createCategoryRepo,
  getCategoriesRepo,
  updateCategoryRepo,
  deleteCategoryRepo,
} from "../repositories/categoryRepository.js";

export const createCategory = async (data, user) => {
  if (!data.name) throw new Error("Category name is required");

  await createCategoryRepo(data.name, user.id);

  return { message: "Category created successfully" };
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