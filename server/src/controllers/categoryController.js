import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from "../services/categoryService.js";

export const createCategoryController = async (req, res, next) => {
  try {
    const result = await createCategory(req.body, req.user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCategoriesController = async (req, res, next) => {
  try {
    const result = await getCategories(req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const result = await updateCategory(req.params.id, req.body, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const result = await deleteCategory(req.params.id, req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get category by id
export const getCategoryByIdController = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id, req.user);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};  