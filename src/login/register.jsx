import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    tel: "",
    password: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

 
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("tel", formData.tel);
    data.append("password", formData.password);
    
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await axios.post(
        "http://localhost/backend/login/register.php",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true 
        }
      );

      if (res.data.status === "success") {
        alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
        navigate("/login");
      } else {
        alert(res.data.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <Form onSubmit={handleRegister} className="w-50 mx-auto mt-5 p-4 border rounded shadow-sm bg-white">
      <h2 className="text-center mb-4">สมัครสมาชิก</h2>

      <div className="text-center mb-4">
        <div 
          className="mx-auto border d-flex justify-content-center align-items-center overflow-hidden" 
          style={{ width: "120px", height: "120px", borderRadius: "50%", backgroundColor: "#f8f9fa" }}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span className="text-muted small">ไม่มีรูปภาพ</span>
          )}
        </div>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>รูปโปรไฟล์</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ชื่อผู้ใช้ (Username)</Form.Label>
        <Form.Control type="text" name="username" placeholder="ตั้งชื่อผู้ใช้" value={formData.username} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>อีเมล (Email)</Form.Label>
        <Form.Control type="email" name="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>เบอร์โทรศัพท์</Form.Label>
        <Form.Control type="text" name="tel" placeholder="08xxxxxxxx" value={formData.tel} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>รหัสผ่าน</Form.Label>
        <Form.Control type="password" name="password" placeholder="ตั้งรหัสผ่าน" value={formData.password} onChange={handleChange} required />
      </Form.Group>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="success" type="submit">
          ยืนยันการสมัคร
        </Button>
        <Button variant="outline-secondary" type="button" onClick={() => navigate('/login')}>
          กลับไปหน้าเข้าสู่ระบบ
        </Button>
      </div>
    </Form>
  );
}

export default Register;