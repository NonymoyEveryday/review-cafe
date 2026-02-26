import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // นำเข้า useLocation
import axios from "axios";
import CafeCard from "../components/CafeCard";

function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. ดึง Query String จาก URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || ""; // ถ้าไม่มีให้เป็นค่าว่าง

  useEffect(() => {
    // 2. ดึงข้อมูลคาเฟ่ทั้งหมดจาก Backend (ใช้ไฟล์ routes/cafes.php ที่เราปรับล่าสุด)
    axios.get("http://localhost/backend/routes/cafes.php")
      .then((res) => {
        setCafes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลคาเฟ่");
        setLoading(false);
      });
  }, []); // [] หมายถึงดึงข้อมูลแค่ครั้งเดียวตอนโหลดหน้า

  // 3. กรองข้อมูลคาเฟ่ตามคำค้นหา (เช็คทั้งจาก ชื่อคาเฟ่ และ คำอธิบาย)
  const filteredCafes = cafes.filter(cafe => {
    if (!searchQuery) return true; // ถ้าไม่ได้ค้นหาอะไรเลย ให้แสดงทั้งหมด
    
    // แปลงทุกอย่างเป็นพิมพ์เล็ก (toLowerCase) เพื่อให้ค้นหาเจอแม้พิมพ์ตัวใหญ่หรือตัวเล็กสลับกัน
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchName = cafe.name.toLowerCase().includes(lowerCaseQuery);
    const matchDesc = cafe.description && cafe.description.toLowerCase().includes(lowerCaseQuery);
    
    return matchName || matchDesc;
  });

  // แสดงตอนกำลังโหลด
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

  // แสดงตอน Error
  if (error) {
    return (
      <div className="alert alert-danger mt-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="mt-4 mb-5">
      {/* 4. เปลี่ยนหัวข้อตามการค้นหา */}
      <h2 className="mb-4 text-center fw-bold text-dark">
        {searchQuery ? `🔍 ผลการค้นหาสำหรับ: "${searchQuery}"` : "รายการคาเฟ่ทั้งหมด ☕"}
      </h2>
      
      <div className="row">
        {filteredCafes.length > 0 ? (
          filteredCafes.map((cafe) => (
            <div key={cafe.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <CafeCard cafe={cafe} />
            </div>
          ))
        ) : (
          // 5. กรณีค้นหาแล้วไม่เจออะไรเลย
          <div className="col-12 text-center text-muted py-5 border rounded bg-light">
            <h4>{searchQuery ? "ไม่พบคาเฟ่ที่คุณค้นหา 😥" : "ยังไม่มีข้อมูลคาเฟ่ในระบบ 😥"}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default CafeList;