import { useLocation, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { createTask, updateTask } from "../api/taskApi";
import Navbar from "../components/Navbar";

const AddTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task; // <-- task from MyTask

  const handleSubmit = async (data: any) => {
    try {
      if (task) {
        // EDIT MODE
        await updateTask(task.id, {
          ...data,
          status: task.status,
        });
      } else {
        // CREATE MODE
        await createTask(data);
      }

      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar>
      <TaskForm
      onSubmit={handleSubmit}
      initialData={
        task
          ? {
              title: task.title,
              description: task.description,
              priority: task.priority,
              due_date: task.dueDate?.split("T")[0],
            }
          : undefined
      }
    />
    </Navbar>
    
  );
};

export default AddTask;