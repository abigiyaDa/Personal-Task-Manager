// API endpoints for user registration and login.
// Defines URLs 

import express from "express";
import { register, login,updateUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/users/update", protect, updateUser);

export default router;