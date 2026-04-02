import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/taskService.js";

export const createTaskController = async (req, res, next) => {
  try {
    const result = await createTask(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllTasksController = async (req, res, next) => {
  try {
    const tasks = await getAllTasks(req.user);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdController = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = async (req, res, next) => {
  try {
    const result = await updateTask(req.params.id, req.body, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const result = await deleteTask(req.params.id, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};