import express from "express";
import {
  createTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
  assignCategoryController,
  getTasksByCategoryController
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createTaskController);
router.post("/assign-category", protect, assignCategoryController);
router.get("/category/:categoryId", getTasksByCategoryController);
router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;