// components/CategoryList.tsx
import React from "react";
import type { Category } from "../types/types";
import {Edit , Delete} from 'lucide-react';

interface Props {
  categories: Category[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CategoryList: React.FC<Props> = ({ categories, onDelete, onEdit }) => {
  return (
    <div>
      <h3>Task Status</h3>
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td className="action-btns">
                <button className="edit-btn" onClick={() => onEdit(cat.id)}>
                  <Edit/>  Edit
                </button>
                <button className="delete-btn" onClick={() => onDelete(cat.id)}>
                  <Delete />Delete
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