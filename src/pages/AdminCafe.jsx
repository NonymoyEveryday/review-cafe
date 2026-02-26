import { useState, useEffect } from "react";
import axios from "axios";

function AdminCafe() {
  const [cafes, setCafes] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // State สำหรับจัดการฟอร์ม
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // ข้อมูลในฟอร์ม
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // ดึงข้อมูลคาเฟ่และหมวดหมู่เมื่อโหลดหน้า
  useEffect(() => {
    fetchCafes();
    fetchCategories();
  }, []);

  const fetchCafes = async () => {
    try {
      // เรียกใช้ API ตัวเดียวกับที่ผู้ใช้ทั่วไปใช้ได้เลย
      const res = await axios.get("http://localhost/backend/api/cafes.php");
      setCafes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      // ต้องสร้างไฟล์ categories.php สำหรับดึงหมวดหมู่มาเป็นตัวเลือก (Dropdown)
      const res = await axios.get("http://localhost/backend/api/categories.php");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // จัดการเมื่อพิมพ์ข้อความลงฟอร์ม
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // จัดการเมื่อเลือกไฟล์รูปภาพ
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // เปิดฟอร์มสำหรับ "เพิ่ม"
  const handleAddNew = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: "", description: "", address: "", category_id: "" });
    setImageFile(null);
    setShowForm(true);
  };

  // เปิดฟอร์มสำหรับ "แก้ไข"
  const handleEdit = (cafe) => {
    setIsEditing(true);
    setEditId(cafe.id);
    setFormData({
      name: cafe.name,
      description: cafe.description,
      address: cafe.address || "",
      category_id: cafe.category_id || "",
    });
    setImageFile(null); // กรณีแก้ไข ถ้าไม่เลือกรูปใหม่ ก็จะใช้รูปเดิมฝั่ง Backend
    setShowForm(true);
  };

  // ปิดฟอร์ม
  const handleCancel = () => {
    setShowForm(false);
  };

  // บันทึกข้อมูล (เพิ่ม/แก้ไข)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // เนื่องจากมีการอัปโหลดไฟล์ ต้องใช้ FormData
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("address", formData.address);
    data.append("category_id", formData.category_id);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (isEditing) {
        data.append("id", editId);
        data.append("action", "update"); // ส่ง flag ไปบอก PHP ว่านี่คือการอัปเดต
      } else {
        data.append("action", "create");
      }

      const res = await axios.post("http://localhost/backend/api/admin_manage_cafe.php", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.status === "success") {
        alert(isEditing ? "อัปเดตข้อมูลสำเร็จ" : "เพิ่มคาเฟ่สำเร็จ");
        setShowForm(false);
        fetchCafes(); // โหลดข้อมูลตารางใหม่
      } else {
        alert("เกิดข้อผิดพลาด: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  // ลบข้อมูล
  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบคาเฟ่นี้? (ข้อมูลรีวิวที่เกี่ยวข้องอาจถูกลบด้วย)")) {
      try {
        const data = new FormData();
        data.append("action", "delete");
        data.append("id", id);

        const res = await axios.post("http://localhost/backend/api/admin_manage_cafe.php", data);
        
        if (res.data.status === "success") {
          alert("ลบคาเฟ่สำเร็จ");
          fetchCafes();
        } else {
          alert("เกิดข้อผิดพลาดในการลบ");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 fw-bold">จัดการข้อมูลคาเฟ่ (Admin)</h2>

      {showForm ? (
        /* ================== ฟอร์มเพิ่ม/แก้ไขคาเฟ่ ================== */
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">{isEditing ? "แก้ไขข้อมูลคาเฟ่" : "เพิ่มคาเฟ่ใหม่"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">ชื่อคาเฟ่</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">หมวดหมู่</label>
                  <select className="form-select" name="category_id" value={formData.category_id} onChange={handleChange} required>
                    <option value="">-- เลือกหมวดหมู่ --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">คำอธิบาย</label>
                <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">ที่อยู่ (Address)</label>
                <textarea className="form-control" name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label">รูปภาพปกคาเฟ่</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} required={!isEditing} />
                {isEditing && <small className="text-muted">หากไม่ต้องการเปลี่ยนรูปภาพ ไม่ต้องอัปโหลดไฟล์ใหม่</small>}
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">{isEditing ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มคาเฟ่"}</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ================== ตารางแสดงคาเฟ่ทั้งหมด ================== */
        <div className="card shadow-sm">
          <div className="card-body">
            <button className="btn btn-primary mb-3" onClick={handleAddNew}>+ เพิ่มคาเฟ่ใหม่</button>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="5%">ID</th>
                    <th width="15%">รูปภาพ</th>
                    <th width="25%">ชื่อคาเฟ่</th>
                    <th width="15%">เข้าชม</th>
                    <th width="20%">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {cafes.length > 0 ? (
                    cafes.map((cafe) => (
                      <tr key={cafe.id}>
                        <td>{cafe.id}</td>
                        <td>
                          <img 
                            src={cafe.image ? `http://localhost/backend/uploads/${cafe.image}` : "https://via.placeholder.com/100?text=No+Img"} 
                            alt={cafe.name} 
                            style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} 
                          />
                        </td>
                        <td>{cafe.name}</td>
                        <td>{cafe.view_count || 0}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(cafe)}>แก้ไข</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cafe.id)}>ลบ</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">ยังไม่มีข้อมูลคาเฟ่</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCafe;