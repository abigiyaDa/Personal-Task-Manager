import {
  createTaskRepo,
  getAllTasksRepo,
  getTaskByIdRepo,
  updateTaskRepo,
  deleteTaskRepo,
  assignCategoryToTaskRepo
} from "../repositories/taskRepository.js";

import { validateTask } from "../validators/taskValidator.js";
export const createTask = async (data, user) => {
  validateTask(data);

  const task = {
    title: data.title,
    description: data.description || null,
    priority: data.priority || "Moderate",
    due_date: data.due_date || null,
    user_id: user.id,
  };

  if (!task.user_id) {
    throw new Error("User not authenticated");
  }

  const result = await createTaskRepo(task);

  // Return the created task
  return {
    id: result.insertId,
    title: task.title,
    description: task.description,
    status: "In Progress", // assuming default
    priority: task.priority,
    createdAt: new Date().toISOString(),
    dueDate: task.due_date
  };
};

export const getAllTasks = async (user) => {
  const tasks = await getAllTasksRepo(user.id);
  return tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    categoryId: task.categoryId,
    categoryName: task.categoryName
  }));
};

export const getTaskById = async (task_id, user) => {
  const task = await getTaskByIdRepo(task_id, user.id);

  if (!task) throw new Error("Task not found");

  return {
    id: task.task_id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    createdAt: task.created_at,
    dueDate: task.due_date
  };
};

export const updateTask = async (task_id, data, user) => {
  validateTask(data);

  const result = await updateTaskRepo(task_id, user.id, data);

  if (result.affectedRows === 0) {
    throw new Error("Task not found or unauthorized");
  }

  return { message: "Task updated successfully" };
};

export const deleteTask = async (task_id, user) => {
  const result = await deleteTaskRepo(task_id, user.id);

  if (result.affectedRows === 0) {
    throw new Error("Task not found or unauthorized");
  }

  return { message: "Task deleted successfully" };
};

export const assignCategoryToTask = async (taskId, categoryId, user) => {
  if (!taskId) {
    throw new Error("Task ID are required");
  }
  if (!categoryId) return { message: "No category to assign" };

  await assignCategoryToTaskRepo(taskId, categoryId);

  return { message: "Category assigned to task" };
};
