import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

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
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

