import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


function EditProfile({ setUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    tel: "",
    password: "", 
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost/backend/routes/profile.php", { withCredentials: true });
        if (res.data.status === "success") {
          const user = res.data.user;
          setFormData({
            username: user.username || "",
            email: user.email || "",
            tel: user.tel || "",
            password: "",
          });
          if (user.images) {
            setImagePreview(`http://localhost/backend/img/${user.images}`);
          }
        } else {
          alert("ไม่สามารถดึงข้อมูลโปรไฟล์ได้");
          navigate("/login");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("tel", formData.tel);
    if (formData.password) {
      data.append("password", formData.password);
    }
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await axios.post("http://localhost/backend/routes/profile.php", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true 
      });

      if (res.data.status === "success") {
        navigate("/"); 
        alert("อัปเดตโปรไฟล์เรียบร้อยแล้ว!");
        
        
        const loginRes = await axios.get("http://localhost/backend/login/login.php", { withCredentials: true });
        if (loginRes.data.status === "success" && setUser) {
          setUser(loginRes.data.user);
        }
      } else {
        alert("ข้อผิดพลาด: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div className="w-50 mx-auto mt-5 p-4 border rounded shadow-sm bg-white mb-5">
      <h2 className="text-center mb-4 fw-bold">แก้ไขโปรไฟล์</h2>

      <Form onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <div 
            className="mx-auto border d-flex justify-content-center align-items-center overflow-hidden shadow-sm" 
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
          <Form.Label>เปลี่ยนรูปโปรไฟล์</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ชื่อผู้ใช้ (Username)</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>อีเมล (Email)</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control type="text" name="tel" value={formData.tel} onChange={handleChange} required />
        </Form.Group>

        <hr className="my-4" />
        <h5 className="text-muted mb-3">เปลี่ยนรหัสผ่าน (เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)</h5>

        <Form.Group className="mb-4">
          <Form.Label>รหัสผ่านใหม่</Form.Label>
          <Form.Control type="password" name="password" placeholder="พิมพ์รหัสผ่านใหม่" value={formData.password} onChange={handleChange} />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>ยกเลิก</Button>
          <Button variant="success" type="submit">บันทึกการเปลี่ยนแปลง</Button>
        </div>
      </Form>
    </div>
  );
}

export default EditProfile;