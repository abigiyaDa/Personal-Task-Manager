import React from "react";
import type { Category, Task } from "../types/types";

interface Props {
  categories: Category[];
  tasks: Task[]; 
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CategoryList: React.FC<Props> = ({
  categories,
  tasks,
  onDelete,
  onEdit,
}) => {

  const getTaskCount = (categoryId: number) => {
    return tasks.filter((task) => task.categoryId === categoryId).length;
  };

  return (
    <div>
      <h3>Categories</h3>
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Tasks</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>

              <td>{getTaskCount(cat.id)} tasks</td>

              <td className="action-btns">
                <button className="edit-btn" onClick={() => onEdit(cat.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(cat.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;