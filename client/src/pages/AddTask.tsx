import { useLocation,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { createTask, updateTask } from "../api/taskApi";
function AddTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  const handleSubmit = async (data: any) => {
    try {
      if (task) {
        await updateTask(task.id, data);
      } else {
        await createTask(data);
      }
      navigate("/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar>
      <TaskForm initialData={task} onSubmit={handleSubmit} />
    </Navbar>
  );
}

export default AddTask;