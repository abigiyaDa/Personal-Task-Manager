import db from "../config/db.js";

export const createCategoryRepo = async (name, user_id) => {
  const [result] = await db.execute(
    "INSERT INTO Category (name, user_id) VALUES (?, ?)",
    [name, user_id]
  );
  return result;
};

export const getCategoriesRepo = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM Category WHERE user_id = ?",
    [user_id]
  );
  return rows;
};

export const updateCategoryRepo = async (category_id, name, user_id) => {
  const [result] = await db.execute(
    "UPDATE Category SET name=? WHERE category_id=? AND user_id=?",
    [name, category_id, user_id]
  );
  return result;
};

export const deleteCategoryRepo = async (category_id, user_id) => {
  const [result] = await db.execute(
    "DELETE FROM Category WHERE category_id=? AND user_id=?",
    [category_id, user_id]
  );
  return result;
};

// get category by id
export const getCategoryByIdRepo = async (category_id, user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM Category WHERE category_id=? AND user_id=?",
    [category_id, user_id]
  );
  return rows[0]; // returns single category or undefined
};