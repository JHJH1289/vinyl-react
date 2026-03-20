import "./App.css";
import "./styles/fonts.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;