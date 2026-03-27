import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
function AddTask() {
  const location = useLocation();
  const task = location.state?.task;

  return (
    <Navbar>
      <TaskForm initialData={task} />
    </Navbar>
  );
}

export default AddTask;