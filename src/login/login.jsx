import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function Login({ setRole, setUser }) { 
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost/backend/login/login.php",
        { username, password },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        const loggedInUser = res.data.user;

        
        if (setRole) setRole(loggedInUser.role);
        if (setUser) setUser(loggedInUser); 

        if (loggedInUser?.role === "admin") {
          alert("เข้าสู่ระบบสำเร็จในฐานะ Admin");
          navigate("/admin");
        } else {
          alert("เข้าสู่ระบบสำเร็จ");
          navigate("/");
        }

      } else {
        alert(res.data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      handleLogin();
    }} className="w-50 mx-auto mt-5">
      <h1 className="text-center">เข้าสู่ระบบ</h1>

      <Form.Group className="mb-3">
        <Form.Label>ชื่อผู้ใช้</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>รหัสผ่าน</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" type="submit">
          เข้าสู่ระบบ
        </Button>
        <Button 
          variant="outline-secondary" 
          type="button" 
          onClick={() => navigate('/register')}
        >
          สมัครสมาชิก
        </Button>
      </div>
    </Form>
  );
}

export default Login;