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
        <img src="https://i.pinimg.com/736x/47/0e/57/470e571c701871caec015c617b2ce651.jpg" alt="" />
        <h1>L.nai.de</h1>
      </div>
      
      <div className="img1 img2" style={{ gap: "10px" }}>
        {role === "admin" && (
          <>
            <NavLink to="/admin" >Dashboard</NavLink>
            <NavLink to="/admin/categories" >จัดการหมวดหมู่</NavLink>
            <NavLink to="/admin/details" >จัดการคาเฟ่</NavLink>
            <NavLink to="/admin/reviews" >จัดการรีวิว</NavLink>
          </>
        )}
      </div>
      
      <div className="img1" style={{ gap: "15px", alignItems: "center" }}>
        {role ? (
          <>
            <span style={{ color: "white", fontSize: "16px" }}>
              ยินดีต้อนรับ, <strong >{user?.username || "User"}</strong>
            </span>
            <button onClick={handleLogout} className="btn1">
              Logout
            </button>
            
           
            <img 
              src={user?.images ? `http://localhost/backend/img/${user.images}` : `https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random&color=fff`} 
              alt="Profile" 
              onClick={() => navigate('/profile')}
              title="แก้ไขโปรไฟล์"
              style={{ 
                width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", 
                backgroundColor: "#fff", cursor: "pointer", border: "2px solid #d78f9b",
                transition: "transform 0.2s"
              }} 
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </>
        ) : (
          <>
           
            
            
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