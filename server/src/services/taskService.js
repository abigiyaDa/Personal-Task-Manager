import {
  createTaskRepo,
  getAllTasksRepo,
  getTaskByIdRepo,
  updateTaskRepo,
  deleteTaskRepo,
} from "../repositories/taskRepository.js";

import { validateTask } from "../validators/taskValidator.js";

export const createTask = async (data, user) => {
  validateTask(data);

  const task = {
    title: data.title,
    description: data.description || null,
    priority: data.priority || "Medium",
    due_date: data.due_date || null,
    user_id: user.id,
  };

  if (!task.user_id) {
    throw new Error("User not authenticated");
  }

  await createTaskRepo(task);

  return { message: "Task created successfully" };
};

export const getAllTasks = async (user) => {
  const tasks = await getAllTasksRepo(user.id);
  return tasks;
};

export const getTaskById = async (task_id, user) => {
  const task = await getTaskByIdRepo(task_id, user.id);

  if (!task) throw new Error("Task not found");

  return task;
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