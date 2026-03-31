// data access - runs SQL queries and returns results to service layer
import db from "../config/db.js";

export const createUser = async (name, email, password) => {
  try {
  const [result] = await db.execute(
    "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database error");
  }
};

export const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Database error");
  }
};