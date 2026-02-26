import { useState, useEffect } from "react";
import axios from "axios";
import CafeCard from "../components/CafeCard"; // นำเข้า CafeCard ที่เราสร้างไว้

function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // เรียกดึงข้อมูลจาก Backend (อย่าลืมเปลี่ยน URL ให้ตรงกับไฟล์ PHP ของคุณ)
    axios.get("http://localhost/backend/api/cafes.php")
      .then((res) => {
        // สมมติว่า Backend ส่งเป็น Array กลับมาเลย
        setCafes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลคาเฟ่");
        setLoading(false);
      });
  }, []);

  // หน้าจอตอนกำลังโหลดข้อมูล
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">กำลังโหลดข้อมูลคาเฟ่...</p>
      </div>
    );
  }

  // หน้าจอตอนเกิด Error (เช่น ลืมเปิด XAMPP หรือ URL ผิด)
  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4 text-center fw-bold text-dark">รายการคาเฟ่ทั้งหมด ☕</h2>
      
      {/* ใช้ Bootstrap Grid จัดเรียง */}
      <div className="row">
        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            // จอเล็กแสดง 1 แถว (col-12), จอกลาง 2 แถว (col-md-6), จอใหญ่ 3 แถว (col-lg-4)
            <div key={cafe.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <CafeCard cafe={cafe} />
            </div>
          ))
        ) : (
          // กรณีดึงข้อมูลสำเร็จ แต่ในฐานข้อมูลยังไม่มีคาเฟ่เลย
          <div className="col-12 text-center text-muted py-5">
            <h4>ยังไม่มีข้อมูลคาเฟ่ในระบบ 😥</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default CafeList;