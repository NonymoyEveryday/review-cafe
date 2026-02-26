import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [image, setImage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !tel || !image) {
      alert("กรอกข้อมูลให้ครบ");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("tel", tel);
    formData.append("password", password);
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost/backend/login/register.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        alert("สมัครสมาชิกสำเร็จ");
        navigate("/login");
      } else {
        alert(res.data.message || "เกิดข้อผิดพลาด");
      }

    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <Form onSubmit={handleRegister} className="w-50 mx-auto mt-5">
      <h2 className="text-center mb-4">สมัครสมาชิก</h2>

      <Form.Group className="mb-3">
        <Form.Label>ชื่อผู้ใช้</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>อีเมล</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>เบอร์โทร</Form.Label>
        <Form.Control
          type="text"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>รหัสผ่าน</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>รูปโปรไฟล์</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>

      <Button type="submit" className="w-100">
        สมัครสมาชิก
      </Button>
    </Form>
  );
}

export default Register;