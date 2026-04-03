// /home/abigu/internship/personal-task-manager/Personal-Task-Manager/client/src/components/TaskForm.tsx

import React, { useState } from 'react';
import '../styles/TaskForm.css'; // Import the CSS file

interface TaskFormData {
  title: string;
  description: string;
  priority: 'Extreme' | 'Moderate' | 'Low';
  due_date: string;
  category?: string;
}

interface TaskFormProps {
  onSubmit?: (data: TaskFormData) => void;
  initialData?: Partial<TaskFormData>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'Moderate',
    due_date: initialData?.due_date || '',
    category: initialData?.category || '',
    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriorityChange = (priority: 'Extreme' | 'Moderate' | 'Low') => {
    setFormData(prev => ({ ...prev, priority }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <div className="form-field">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <div className="form-field">
          <input
            type="date"
            id="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <div className="form-field priority-field">
          <div className="priority-options">
            <label className={`priority-option ${formData.priority === 'Extreme' ? 'selected' : ''}`}>
              <input
                type="checkbox"
                checked={formData.priority === 'Extreme'}
                onChange={() => handlePriorityChange('Extreme')}
              />
              <span>Extreme</span>
            </label>
            <label className={`priority-option ${formData.priority === 'Moderate' ? 'selected' : ''}`}>
              <input
                type="checkbox"
                checked={formData.priority === 'Moderate'}
                onChange={() => handlePriorityChange('Moderate')}
              />
              <span>Moderate</span>
            </label>
            <label className={`priority-option ${formData.priority === 'Low' ? 'selected' : ''}`}>
              <input
                type="checkbox"
                checked={formData.priority === 'Low'}
                onChange={() => handlePriorityChange('Low')}
              />
              <span>Low</span>
            </label>
          </div>
        </div>
      </div>

     <div className="form-group">
        <label htmlFor="category">Category</label>
        <div className="form-field">
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>
      </div>



      <div className="form-group">
        <label htmlFor="description">Task Description</label>
        <div className="form-field">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Start writing here..."
            rows={4}
          />
        </div>
      </div>

      <button type="submit" className="submit-btn">Create Task</button>
    </form>
  );
};

export default TaskForm;