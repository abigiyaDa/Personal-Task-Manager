// dummyData.ts
import type { Task, Category } from "../types/types";

export const categories: Category[] = [
  { id: 1, name: "Work" },
  { id: 2, name: "Personal" },
  { id: 3, name: "School" },
  { id: 4, name: "Health" },
];

export const tasks: Task[] = [
  {
    id: 1,
    title: "Submit Documents",
    description: "Submit all required documents to the office.",
    status: "Completed",
    priority: "Extreme",
    createdAt: "20/06/2023",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Complete Assignments",
    description: "Finish all pending assignments.",
    status: "In Progress",
    priority: "Moderate",
    createdAt: "19/06/2023",
    dueDate: "25/06/2023",
  },
  {
    id: 3,
    title: "Gym",
    description: "Leg day workout.",
    status: "Completed",
    priority: "Low",
    createdAt: "18/06/2023",
    dueDate: "18/06/2023",
  },
  {
    id: 4,
    title: "Project Meeting",
    description: "Discuss project milestones.",
    status: "In Progress",
    priority: "High",
    createdAt: "17/06/2023",
    dueDate: "22/06/2023",
  },
  {
    id: 5,
    title: "Buy Groceries",
    description: "Milk, Eggs, Bread.",
    status: "In Progress",
    priority: "Low",
    createdAt: "16/06/2023",
    dueDate: "21/06/2023",
  },
  {
    id: 6,
    title: "Doctor Appointment",
    description: "Annual checkup.",
    status: "Completed",
    priority: "High",
    createdAt: "15/06/2023",
    dueDate: "20/06/2023",
  },
  {
    id: 7,
    title: "Complete Assignments",
    description: "Finish all pending assignments.",
    status: "In Progress",
    priority: "Moderate",
    createdAt: "19/06/2023",
    dueDate: "25/06/2023",
  },
];