import { useState, useEffect } from "react";
import axios from "axios";

function AdminReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      
      const res = await axios.get("http://localhost/backend/routes/reviews.php?admin=true");
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.post("http://localhost/backend/routes/reviews.php", {
        action: "approve",
        review_id: id
      }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

      if (res.data.status === "success") {
        alert("อนุมัติรีวิวสำเร็จ!");
        fetchReviews(); 
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรีวิวนี้ทิ้ง?")) {
      try {
        const res = await axios.post("http://localhost/backend/routes/reviews.php", {
          action: "delete",
          review_id: id
        }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

        if (res.data.status === "success") {
          alert("ลบรีวิวสำเร็จ");
          fetchReviews();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4 fw-bold">จัดการรีวิว</h2>
      
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th width="15%">ผู้รีวิว</th>
                  <th width="20%">คาเฟ่</th>
                  <th width="10%">คะแนน</th>
                  <th width="25%">ข้อความ</th>
                  <th width="10%">สถานะ</th>
                  <th width="20%">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <tr key={rev.id}>
                      <td className="fw-bold">{rev.username}</td>
                      <td>{rev.cafe_name}</td>
                      <td className="text-warning fw-bold">{"⭐".repeat(rev.rating)}</td>
                      <td className="text-start text-truncate" style={{ maxWidth: "200px" }}>{rev.comment}</td>
                      <td>
                        {rev.is_approved == 1 ? (
                          <span className="badge bg-success">อนุมัติแล้ว</span>
                        ) : (
                          <span className="badge bg-warning text-dark">รออนุมัติ</span>
                        )}
                      </td>
                      <td>
                        {rev.is_approved == 0 && (
                          <button className="btn btn-sm btn-success me-2" onClick={() => handleApprove(rev.id)}>✓ อนุมัติ</button>
                        )}
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rev.id)}>ลบ</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-muted">ยังไม่มีข้อมูลรีวิวในระบบ</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReview;