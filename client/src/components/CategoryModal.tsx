import React, { useEffect, useState } from "react";
import "../styles/categoryModal.css";
import type { Category } from "../types/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  onUpdate: (name: string) => void;
  editingCategory: Category | null;
}

const CategoryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  editingCategory,
}) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    } else {
      setName("");
    }
  }, [editingCategory]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editingCategory) {
      onUpdate(name);
    } else {
      onCreate(name);
    }

    setName("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editingCategory ? "Edit Category" : "Create Category"}</h3>

        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>
            {editingCategory ? "Update" : "Create"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;