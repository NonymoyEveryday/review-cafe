import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

function Navbar({ role, setRole, user, setUser }) {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost/backend/login/logout.php", { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
    
    if (setRole) setRole(null);
    if (setUser) setUser(null);
    alert("ออกจากระบบเรียบร้อยแล้ว");
    navigate("/login"); 
  };

  return (
    <nav className="nav1">
      <div className="img1" style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
        <img src="https://ui-avatars.com/api/?name=Review+Cafe&background=ff8c00&color=fff" alt="Logo" />
        <h1>Review Cafe</h1>
      </div>
      
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
      
      <div className="img1" style={{ gap: "15px", alignItems: "center" }}>
        {role ? (
          <>
            <span style={{ color: "white", fontSize: "16px" }}>
              ยินดีต้อนรับ, <strong className="text-warning">{user?.username || "Admin"}</strong>
            </span>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              Logout
            </button>
            
            
            <img 
              src={user?.images ? `http://localhost/backend/img/${user.images}` : `https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png`} 
              alt="Profile" 
              onClick={() => navigate('/profile')}
              title="แก้ไขโปรไฟล์"
              style={{ 
                width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", 
                backgroundColor: "#fff", cursor: "pointer", border: "2px solid #ff8c00",
                transition: "transform 0.2s"
              }} 
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-light btn-sm font-weight-bold">
              Login
            </NavLink>
            
            
            <img 
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" 
              alt="Guest" 
              onClick={() => navigate('/login')}
              title="เข้าสู่ระบบ"
              style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }} 
            />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;