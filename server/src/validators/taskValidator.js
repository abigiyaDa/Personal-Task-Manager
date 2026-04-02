export const validateTask = (data) => {
  const { title, priority, due_date } = data;

  if (!title) throw new Error("Title is required");

  if (title.length > 100) {
    throw new Error("Title must be less than 100 characters");
  }

  if (priority && !["Low", "Medium", "High"].includes(priority)) {
    throw new Error("Priority must be Low, Medium, or High");
  }

  if (due_date && new Date(due_date) < new Date()) {
    throw new Error("Due date must be in the future");
  }
};