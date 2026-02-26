import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import CafeList from "./pages/CafeList";
import CafeDetail from "./pages/CafeDetail";
import Admin from "./pages/Admin";
import Login from "./login/login";
import Register from "./login/register";
import Home from "./components/Home";


function App() {
  const [role, setRole] = useState(null);
  return (
    <>

      <Navbar />
      <div className="container mt-4">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CafeList />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />
          <Route
            path="./admin"
            element={
              role === "admin" ? <Admin /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;