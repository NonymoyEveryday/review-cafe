import { Link } from "react-router-dom";

function CafeCard({ cafe }) {
  // สมมติว่ารูปภาพเก็บอยู่ในโฟลเดอร์ uploads ของ backend
  // ถ้าไม่มีรูป ให้แสดงรูป Placeholder แทน
  const imageUrl = cafe.image 
    ? `http://localhost/backend/uploads/${cafe.image}` 
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={cafe.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        {/* ชื่อคาเฟ่ ตัดข้อความหากยาวเกินไป */}
        <h5 className="card-title text-truncate" title={cafe.name}>
          {cafe.name}
        </h5>
        
        {/* คำอธิบาย */}
        <p className="card-text text-muted small text-truncate">
          {cafe.description || "ไม่มีคำอธิบาย"}
        </p>

        {/* ส่วนแสดงคะแนนและยอดเข้าชม จะถูกผลักลงไปด้านล่างเสมอด้วย mt-auto */}
        <div className="d-flex justify-content-between align-items-center mb-3 mt-auto">
          <span className="text-warning fw-bold">
            ⭐ {cafe.rating ? Number(cafe.rating).toFixed(1) : "0.0"}
          </span>
          <span className="text-secondary small">
            👁️ {cafe.view_count || 0} ครั้ง
          </span>
        </div>

        <Link to={`/cafe/${cafe.id}`} className="btn btn-outline-primary w-100">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}

export default CafeCard;