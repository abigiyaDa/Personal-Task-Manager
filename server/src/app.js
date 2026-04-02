import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import taskRoutes from "./routes/taskRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
// Enable CORS for all routes to allow cross-origin requests from the frontend application  
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

// error handler
app.use(errorHandler);

app.use("/tasks", taskRoutes);

app.use("/categories", categoryRoutes);

export default app;