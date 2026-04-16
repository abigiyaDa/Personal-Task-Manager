import API from "./authApi";
import type { Category } from "../types/types";

// GET categories
export const getCategories = async (): Promise<Category[]> => {
  const res = await API.get("/categories");
  return res.data;
};

// CREATE category
export const createCategory = async (name: string) => {
  const res = await API.post("/categories", { name });
  return res.data;
};

// UPDATE category
export const updateCategory = async (id: number, name: string) => {
  const res = await API.put(`/categories/${id}`, { name });
  return res.data;
};

// DELETE category
export const deleteCategory = async (id: number) => {
  const res = await API.delete(`/categories/${id}`);
  return res.data;
};