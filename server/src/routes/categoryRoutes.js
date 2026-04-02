import express from "express";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
} from "../controllers/categoryController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createCategoryController);
router.get("/", getCategoriesController);
// get category by id
router.get("/:id", getCategoryByIdController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);

export default router;