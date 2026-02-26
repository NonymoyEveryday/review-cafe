function CommentList({ comments }) {
  // ตรวจสอบว่ามีคอมเมนต์หรือไม่ ถ้าไม่มีให้แสดงข้อความแจ้งเตือน
  if (!comments || comments.length === 0) {
    return (
      <div className="alert alert-light text-center border mt-4 text-muted">
        ยังไม่มีรีวิวสำหรับคาเฟ่นี้... มาเป็นคนแรกที่รีวิวกันเถอะ!
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="mb-3">รีวิวจากผู้ใช้งาน ({comments.length})</h4>
      <div className="list-group shadow-sm">
        {comments.map((item) => (
          <div key={item.id} className="list-group-item py-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              
              {/* ข้อมูลผู้ใช้ (รูปโปรไฟล์ + ชื่อ) */}
              <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                <img 
                  src={
                    item.user_image 
                      ? `http://localhost/backend/img/${item.user_image}` 
                      : "https://via.placeholder.com/40?text=U"
                  } 
                  alt={item.username} 
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <strong className="mb-0">{item.username || "ผู้ใช้งาน"}</strong>
              </div>

              {/* คะแนนรีวิว (ดาว) */}
              <div className="text-warning fw-bold">
                {"⭐".repeat(Math.round(item.rating || 0))}
                <span className="text-muted ms-2" style={{ fontSize: "0.85em" }}>
                  ({item.rating}/5)
                </span>
              </div>
            </div>

            {/* ข้อความคอมเมนต์ */}
            <p className="mb-2 text-dark mt-2" style={{ whiteSpace: "pre-line" }}>
              {item.comment}
            </p>

            {/* วันที่คอมเมนต์ (แปลงเป็นรูปแบบภาษาไทย) */}
            <small className="text-muted">
              📅 {new Date(item.created_at).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} น.
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;