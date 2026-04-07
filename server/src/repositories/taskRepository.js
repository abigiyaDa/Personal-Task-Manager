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
  const [rows] = await db.execute(`
    SELECT 
      t.task_id AS id,
      t.title,
      t.description,
      t.status,
      t.priority,
      t.due_date AS dueDate,
      c.category_id AS categoryId,
      c.name AS categoryName
    FROM Task t
    LEFT JOIN TaskCategory tc ON t.task_id = tc.task_id
    LEFT JOIN Category c ON tc.category_id = c.category_id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC
  `, [user_id]);

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

  let query = "UPDATE Task SET ";
  const values = [];
  const updates = [];

  if (title !== undefined) {
    updates.push("title=?");
    values.push(title);
  }
  if (description !== undefined) {
    updates.push("description=?");
    values.push(description);
  }
  if (priority !== undefined) {
    updates.push("priority=?");
    values.push(priority);
  }
  if (due_date !== undefined) {
    updates.push("due_date=?");
    values.push(due_date);
  }
  if (status !== undefined) {
    updates.push("status=?");
    values.push(status);
  }

  if (updates.length === 0) return { affectedRows: 0 };

  query += updates.join(", ") + " WHERE task_id=? AND user_id=?";
  values.push(task_id, user_id);

  const [result] = await db.execute(query, values);

  return result;
};

export const deleteTaskRepo = async (task_id, user_id) => {
  const [result] = await db.execute(
    "DELETE FROM Task WHERE task_id = ? AND user_id = ?",
    [task_id, user_id]
  );
  return result;
};
export const assignCategoryToTaskRepo = async (task_id, category_id) => {
  // check if exists
  const [rows] = await db.execute(
    "SELECT * FROM TaskCategory WHERE task_id = ?",
    [task_id]
  );

  if (rows.length > 0) {
    // ✅ update existing
    await db.execute(
      "UPDATE TaskCategory SET category_id = ? WHERE task_id = ?",
      [category_id, task_id]
    );
  } else {
    // ✅ insert new
    await db.execute(
      "INSERT INTO TaskCategory (task_id, category_id) VALUES (?, ?)",
      [task_id, category_id]
    );
  }

  return { message: "Category assigned/updated" };
};