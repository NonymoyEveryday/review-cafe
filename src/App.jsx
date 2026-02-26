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
import AdminCafe from "./pages/AdminCafe";

function App() {
  // 1. เปลี่ยนจากแค่ role เป็นเก็บ user ทั้งก้อน (เช่น { username: "...", role: "admin" })
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost/backend/login/login.php", {
      withCredentials: true
    }).then(res => {
      // ตรวจสอบว่า backend ส่งข้อมูลผู้ใช้กลับมาหรือไม่ (ปรับแก้ตามโครงสร้าง backend ของคุณ)
      if (res.data.role) {
        setUser({
          username: res.data.username || "User",
          role: res.data.role
        });
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* 2. ส่งข้อมูล user ไปให้ Navbar ทำการแสดงผลซ่อน/โชว์ */}
      <Navbar user={user} setUser={setUser} />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? <Admin /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/cafes"
            element={user?.role === "admin" ? <AdminCafe /> : <Navigate to="/login" />}
          />

          {/* 3. ส่ง setUser ไปให้หน้า Login อัปเดตตอนเข้าระบบผ่าน */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;