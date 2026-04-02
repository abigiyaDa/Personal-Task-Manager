import db from "../config/db.js";

export const createTaskRepo = async (task) => {
  const { title, description, priority, due_date, user_id } = task;

  const [result] = await db.execute(
    `INSERT INTO Task (title, description, priority, due_date, user_id)
     VALUES (?, ?, ?, ?, ?)`,
    [title, description, priority, due_date, user_id]
  );

  return result;
};

export const getAllTasksRepo = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM Task WHERE user_id = ? ORDER BY created_at DESC",
    [user_id]
  );
  return rows;
};

export const getTaskByIdRepo = async (task_id, user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM Task WHERE task_id = ? AND user_id = ?",
    [task_id, user_id]
  );
  return rows[0];
};

export const updateTaskRepo = async (task_id, user_id, task) => {
  const { title, description, priority, due_date, status } = task;

  const [result] = await db.execute(
    `UPDATE Task
     SET title=?, description=?, priority=?, due_date=?, status=?
     WHERE task_id=? AND user_id=?`,
    [title, description, priority, due_date, status, task_id, user_id]
  );

  return result;
};

export const deleteTaskRepo = async (task_id, user_id) => {
  const [result] = await db.execute(
    "DELETE FROM Task WHERE task_id = ? AND user_id = ?",
    [task_id, user_id]
  );
  return result;
};