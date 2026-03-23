import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
       <Route path="/" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;