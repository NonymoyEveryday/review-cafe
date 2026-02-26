import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import CafeList from "./pages/CafeList";
import CafeDetail from "./pages/CafeDetail";
import Admin from "./pages/Admin";
import Login from "./login/login";
import Register from "./login/register";
import Home from "./components/Home";
import AdminCategory from "./pages/AdminCategory"; 
import AdminCafe from "./pages/AdminCafe";
import AdminReview from "./pages/Adminreview"; 


function App() {
  const [role, setRole] = useState(null);

  // ให้ App.jsx เป็นคนเช็ค Login ที่เดียวพอ
  useEffect(() => {
    axios.get("http://localhost/backend/login/login.php", {
      withCredentials: true
    }).then(res => {
      setRole(res.data.role);
    }).catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* ส่ง role ที่เช็คได้ ไปให้ Navbar เอาไปใช้ต่อ */}
      <Navbar role={role} setRole={setRole} />
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafe/:id" element={<CafeDetail role={role} />} />
          
          {/* โซนแอดมิน (เอาจุดหน้า /admin ออกแล้ว) */}
          <Route path="/admin" element={role === "admin" ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/admin/categories" element={role === "admin" ? <AdminCategory /> : <Navigate to="/login" />} />
          <Route path="/admin/details" element={role === "admin" ? <AdminCafe /> : <Navigate to="/login" />} />
          <Route path="/admin/reviews" element={role === "admin" ? <AdminReview /> : <Navigate to="/login" />} />
          
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;