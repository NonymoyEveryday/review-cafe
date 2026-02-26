import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // 1. อย่าลืม import axios

import Navbar from "./components/Navbar";
import CafeList from "./pages/CafeList";
import CafeDetail from "./pages/CafeDetail";
import Admin from "./pages/Admin";
import Login from "./login/login";
import Register from "./login/register";
import Home from "./components/Home";

function App() {
  const [role, setRole] = useState(null);

  // 2. ดึงสถานะ role เมื่อโหลดหน้าเว็บ (เหมือนที่คุณทำใน Navbar)
  useEffect(() => {
    axios.get("http://localhost/backend/login/login.php", {
      withCredentials: true
    }).then(res => {
      setRole(res.data.role);
    }).catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />
          
          {/* 3. เอาจุดออก เปลี่ยนเป็น "/admin" */}
          <Route
            path="/admin"
            element={
              role === "admin" ? <Admin /> : <Navigate to="/login" />
            }
          />
          
          {/* 4. ส่ง setRole เป็น props ไปที่ Login */}
          <Route path="/login" element={<Login setRole={setRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;