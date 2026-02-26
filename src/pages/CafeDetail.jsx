import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/CommentList";
import RatingStars from "../components/RatingStars";

function CafeDetail() {
  const { id } = useParams(); // ดึง ID คาเฟ่จาก URL (เช่น /cafe/1 จะได้ id=1)
  const navigate = useNavigate();

  // State สำหรับเก็บข้อมูล
  const [cafe, setCafe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State สำหรับฟอร์มรีวิว
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ดึงข้อมูลคาเฟ่และคอมเมนต์เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        // 1. ดึงรายละเอียดคาเฟ่ (ต้องไปสร้างไฟล์ get_cafe_detail.php รับค่า id)
        const cafeRes = await axios.get(`http://localhost/backend/api/cafes.php?id=${id}`);
        setCafe(cafeRes.data);

        // 2. ดึงรายการคอมเมนต์ (ใช้ไฟล์ PHP ที่คุณส่งมาก่อนหน้านี้)
        const reviewRes = await axios.get(`http://localhost/backend/api/reviews.php?cafe_id=${id}`);
        setComments(reviewRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchCafeData();
  }, [id]);

  // ฟังก์ชันจัดการการส่งรีวิว
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("กรุณาให้คะแนนดาวก่อนรีวิวครับ!");
      return;
    }
    if (commentText.trim() === "") {
      alert("กรุณาพิมพ์ข้อความรีวิวด้วยครับ!");
      return;
    }

    setIsSubmitting(true);

    try {
      // ดึง user_id จาก Session หรือ LocalStorage (สมมติว่าคุณเก็บข้อมูล user ไว้ตอน Login)
      // *หากระบบของคุณเก็บต่างออกไป ให้ปรับแก้ตรงนี้ให้ตรงกับข้อมูล User ปัจจุบัน
      const currentUser = JSON.parse(localStorage.getItem("user")) || { id: 1 }; // สมมติให้ id=1 ไปก่อนถ้ายังไม่ได้ทำระบบเก็บ user

      const reviewData = {
        cafe_id: id,
        user_id: currentUser.id, 
        rating: rating,
        comment: commentText
      };

      // ยิง POST ไปที่ไฟล์ PHP ที่คุณเตรียมไว้
      const res = await axios.post("http://localhost/backend/api/reviews.php", reviewData, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data.status === "success") {
        alert("ขอบคุณสำหรับรีวิวครับ!");
        // รีเซ็ตฟอร์ม
        setRating(0);
        setCommentText("");
        // โหลดคอมเมนต์ใหม่ (เพื่อให้รีวิวใหม่ขึ้นมาแสดงทันที)
        const newReviewRes = await axios.get(`http://localhost/backend/api/reviews.php?cafe_id=${id}`);
        setComments(newReviewRes.data);
      } else {
        alert("เกิดข้อผิดพลาดในการส่งรีวิว");
      }
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถส่งรีวิวได้ในขณะนี้");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5">กำลังโหลดข้อมูล...</div>;
  if (!cafe) return <div className="text-center mt-5 alert alert-danger">ไม่พบข้อมูลคาเฟ่นี้</div>;

  return (
    <div className="container mt-4 mb-5">
      {/* ส่วนปุ่มย้อนกลับ */}
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &laquo; ย้อนกลับ
      </button>

      {/* ส่วนรายละเอียดคาเฟ่ */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <img 
            src={cafe.image ? `http://localhost/backend/uploads/${cafe.image}` : "https://via.placeholder.com/600x400?text=No+Image"} 
            alt={cafe.name} 
            className="img-fluid rounded shadow-sm w-100"
            style={{ objectFit: "cover", maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="fw-bold">{cafe.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <RatingStars rating={cafe.avg_rating || 0} readOnly={true} />
            <span className="ms-3 text-muted">({cafe.view_count || 0} views)</span>
          </div>
          <p className="text-dark" style={{ whiteSpace: "pre-line" }}>{cafe.description}</p>
          
          {cafe.address && (
            <div className="mt-3 p-3 bg-light rounded">
              <strong>📍 ที่อยู่:</strong> <br/>
              {cafe.address}
            </div>
          )}
        </div>
      </div>

      <hr className="my-5" />

      {/* ส่วนแสดงฟอร์มรีวิว */}
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm mb-5">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">เขียนรีวิวของคุณ</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitReview}>
                <div className="mb-3">
                  <label className="form-label fw-bold">ให้คะแนนร้านนี้</label>
                  <RatingStars 
                    rating={rating} 
                    onRatingChange={setRating} 
                    readOnly={false} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">ความคิดเห็นของคุณ</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="บอกเล่าประสบการณ์ของคุณที่นี่..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-success" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "กำลังส่ง..." : "ส่งรีวิว"}
                </button>
              </form>
            </div>
          </div>

          {/* ส่วนแสดงรายการคอมเมนต์ */}
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default CafeDetail;