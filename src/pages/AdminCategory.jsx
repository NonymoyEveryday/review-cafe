import { useState, useEffect } from "react";
import axios from "axios";

function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

 
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost/backend/routes/categories.php");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: "", slug: "" });
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditId(category.id);
    setFormData({ name: category.name, slug: category.slug });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      action: isEditing ? "update" : "create",
      id: editId,
      name: formData.name,
      slug: formData.slug
    };

    try {
      const res = await axios.post("http://localhost/backend/routes/categories.php", payload, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data.status === "success") {
        alert(res.data.message);
        setShowForm(false);
        fetchCategories(); 
      } else {
        alert("เกิดข้อผิดพลาด: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?")) {
      try {
        const payload = { action: "delete", id: id };
        const res = await axios.post("http://localhost/backend/routes/categories.php", payload, {
          headers: { "Content-Type": "application/json" }
        });

        if (res.data.status === "success") {
          alert("ลบหมวดหมู่สำเร็จ");
          fetchCategories();
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
      <h2 className="mb-4 fw-bold">จัดการหมวดหมู่คาเฟ่ (Admin)</h2>

      {showForm ? (
        <div className="card shadow-sm w-50 mb-4">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">{isEditing ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">ชื่อหมวดหมู่ (ภาษาไทย)</label>
                <input 
                  type="text" className="form-control" name="name" 
                  value={formData.name} onChange={handleChange} required 
                  placeholder="เช่น มินิมอล, ธรรมชาติ, สไตล์ลอฟต์"
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Slug (ภาษาอังกฤษสำหรับ URL)</label>
                <input 
                  type="text" className="form-control" name="slug" 
                  value={formData.slug} onChange={handleChange} required 
                  placeholder="เช่น minimal, nature, loft"
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {isEditing ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มหมวดหมู่"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        
        <div className="card shadow-sm">
          <div className="card-body">
            <button className="btn btn-primary mb-3" onClick={handleAddNew}>+ เพิ่มหมวดหมู่ใหม่</button>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th width="10%">ID</th>
                    <th width="40%">ชื่อหมวดหมู่</th>
                    <th width="30%">Slug</th>
                    <th width="20%">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td className="fw-bold">{category.name}</td>
                        <td><span className="badge bg-secondary">{category.slug}</span></td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(category)}>แก้ไข</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category.id)}>ลบ</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">ยังไม่มีข้อมูลหมวดหมู่</td>
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

export default AdminCategory;