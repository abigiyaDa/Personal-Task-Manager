// components/CategoryModal.tsx
import React, { useState } from "react";
import "../styles/categoryModal.css";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CategoryModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState<string>("");

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create Category</h3>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={handleCreate}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;