import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MyTask from "./pages/MyTask";
import   AddTask  from "./pages/AddTask";
import Calandar  from "./pages/Calendar";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Category from "./pages/Category";

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

        <Route path="/add-task" element= {<AddTask />} />
        < Route path="/calendar" element = {<Calandar/ >} />
        < Route path="/settings" element = { <Settings /> } />
        <Route path="/help" element={<Help />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>    
    
  );
}

export default App;

