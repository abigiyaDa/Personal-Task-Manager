import express from "express";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createCategoryController);
router.get("/", getCategoriesController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;