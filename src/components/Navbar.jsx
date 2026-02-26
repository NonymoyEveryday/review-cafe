import { href, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const [role, setRole] = useState(null);
useEffect(() => {
  axios.get("http://localhost/backend/login/login.php", {
    withCredentials: true
  }).then(res => {
    setRole(res.data.role);
  });
}, []);
  return (
    <nav className="nav1">
      <div className="img1">
        <img src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" alt="" onClick={() => window.location.href = '/'} />
        <h1>Review Cafe</h1>
        </div>
        <div className="img1">
          {role === "admin" && <button>Admin</button>}
        </div>
        <div className="img1">
        <NavLink  to="/login" >
          Login
        </NavLink>
        
        <img src="https://th.bing.com/th/id/OIP.yenHHhgU_UhZ8kbf9nmxOgHaE8?w=275&h=183&c=7&r=0&o=7&pid=1.7&rm=3" alt="" />
        </div>
      
    </nav>
  );
}

export default Navbar;