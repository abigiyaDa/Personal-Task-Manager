import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MyTask from "./pages/MyTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page at root */}
        <Route path="/" element={<LandingPage />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />
        {/* dashboard  */}

        <Route path="/dashboard" element = { <Dashboard /> }/>

        {/* my tasks */}
        <Route path="/tasks" element={<MyTask />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

