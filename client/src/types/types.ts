// types.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Completed" | "In Progress";
  priority: "Low" | "Moderate" | "High" | "Extreme";
  createdAt: string;
  dueDate: string;
  categoryId?: number;
  categoryName?: string;
}

export interface Category {
  id: number;
  name: string;
}