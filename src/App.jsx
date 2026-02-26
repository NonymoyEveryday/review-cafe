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
import AdminReview from "./pages/AdminReview"; 
import EditProfile from "./pages/EditProfile"; 

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    axios.get("http://localhost/backend/login/login.php", {
      withCredentials: true
    }).then(res => {
      if (res.data.status === "success") {
        setRole(res.data.role);
        setUser(res.data.user); 
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <>
    
      <Navbar role={role} setRole={setRole} user={user} setUser={setUser} />
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafe/:id" element={<CafeDetail role={role} />} />
          
         
          <Route path="/admin" element={role === "admin" ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/admin/categories" element={role === "admin" ? <AdminCategory /> : <Navigate to="/login" />} />
          <Route path="/admin/details" element={role === "admin" ? <AdminCafe /> : <Navigate to="/login" />} />
          <Route path="/admin/reviews" element={role === "admin" ? <AdminReview /> : <Navigate to="/login" />} />
          
   
          <Route path="/profile" element={role ? <EditProfile setUser={setUser} /> : <Navigate to="/login" />} />
          

          <Route path="/login" element={<Login setRole={setRole} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;