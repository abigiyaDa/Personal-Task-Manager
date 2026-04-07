export const validateTask = (data) => {
  const { title, priority, due_date } = data;

  if (title !== undefined && !title) throw new Error("Title is required");

  if (title && title.length > 100) {
    throw new Error("Title must be less than 100 characters");
  }

  if (priority && !["Low", "Moderate", "High", "Extreme"].includes(priority)) {
    throw new Error("Priority must be Low, Moderate, High, or Extreme");
  }

  //  ONLY validate due_date IF explicitly provided
  if (due_date !== undefined && due_date !== "") {
    if (new Date(due_date) < new Date()) {
      throw new Error("Due date must be in the future");
    }
  }
};