import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

// รับทั้ง role และ setRole มาจาก App.jsx
function Navbar({ role, setRole }) {
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับออกจากระบบ
  const handleLogout = async () => {
    try {
      // (ถ้ามีไฟล์ logout.php ใน backend ให้ยิง axios ไปเคลียร์ session ด้วย)
      await axios.get("http://localhost/backend/login/logout.php", { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
    
    // ล้างค่า role ใน React กลับเป็น null
    if (setRole) setRole(null);
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/login"); // เด้งกลับหน้า Login
  };

  return (
    <nav className="nav1">
      {/* 1. โลโก้ (คลิกแล้วกลับหน้า Home) */}
      <div className="img1" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
        <img src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" alt="Logo" />
        <h1>Review Cafe</h1>
      </div>
      
      {/* 2. โซนปุ่มเมนูของ Admin (จะโชว์ก็ต่อเมื่อ role === 'admin') */}
      <div className="img1" style={{ gap: "10px" }}>
        {role === "admin" && (
          <>
            <NavLink to="/admin" className="btn btn-dark btn-sm">Dashboard</NavLink>
            <NavLink to="/admin/categories" className="btn btn-dark btn-sm">จัดการหมวดหมู่</NavLink>
            <NavLink to="/admin/details" className="btn btn-dark btn-sm">จัดการคาเฟ่</NavLink>
            <NavLink to="/admin/reviews" className="btn btn-dark btn-sm">จัดการรีวิว</NavLink>
          </>
        )}
      </div>
      
      {/* 3. โซนจัดการบัญชีผู้ใช้ (Login / Logout) */}
      <div className="img1" style={{ gap: "15px", alignItems: "center" }}>
        {role ? (
          // ถ้าล็อกอินแล้ว (ไม่ว่าจะเป็น user หรือ admin)
          <>
            <span style={{ color: "white", fontSize: "16px" }}>
              สถานะ: <strong className="text-warning">{role}</strong>
            </span>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              Logout
            </button>
            <img 
              src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" 
              alt="Profile" 
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
            />
          </>
        ) : (
          // ถ้ายังไม่ล็อกอิน ให้โชว์แค่ปุ่ม Login
          <>
            <NavLink to="/login" className="btn btn-light btn-sm font-weight-bold">
              Login
            </NavLink>
            <img 
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" 
              alt="Guest" 
              style={{ width: "40px", height: "40px", borderRadius: "50%" }} 
            />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;