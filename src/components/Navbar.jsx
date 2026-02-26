import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

// 1. รับ props user และ setUser มาจาก App.jsx 
// (ไม่ต้องใช้ useEffect เช็ค axios ซ้ำในนี้แล้ว)
function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // ฟังก์ชันเผื่อทำปุ่มออกจากระบบ
  const handleLogout = () => {
    // ลบ state
    setUser(null);
    // (ทางที่ดีควรยิง axios ไปไฟล์ logout.php ของ backend ด้วยเพื่อให้ลบ session)
    navigate("/login");
  };

  return (
    <nav className="nav1">
      <div className="img1" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
        <img src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" alt="Logo" />
        <h1>Review Cafe</h1>
      </div>
      
      {/* 2. โซนสำหรับแอดมิน (จะแสดงก็ต่อเมื่อ user.role === 'admin') */}
      <div className="img1" style={{ gap: "10px" }}>
        {user?.role === "admin" && (
          <>
            <NavLink to="/admin" className="btn btn-dark">Admin Dashboard</NavLink>
            <NavLink to="/Admincafe" className="btn btn-dark">จัดการผู้ใช้</NavLink>
            <NavLink to="/Cafedetail" className="btn btn-dark">จัดการหมวดหมู่</NavLink>
            <NavLink to="/cafes" className="btn btn-dark">จัดการคาเฟ่</NavLink>

          </>
        )}
      </div>

      {/* 3. โซนโพรไฟล์ผู้ใช้ หรือ ปุ่ม Login */}
      <div className="img1" style={{ alignItems: "center" }}>
        {user ? (
          // ถ้ามีข้อมูล user (ล็อกอินแล้ว) ให้ซ่อนปุ่ม Login แล้วโชว์ชื่อแทน
          <>
            <span style={{ color: "white", marginRight: "15px", fontSize: "18px" }}>
              ยินดีต้อนรับ, {user.username}
            </span>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm mr-2" style={{ marginRight: "10px" }}>
              Logout
            </button>
            <img src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" alt="Profile" />
          </>
        ) : (
          // ถ้ายังไม่ล็อกอิน ให้โชว์ปุ่ม Login
          <>
            <NavLink to="/login">Login</NavLink>
            <img src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" alt="Guest" />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;