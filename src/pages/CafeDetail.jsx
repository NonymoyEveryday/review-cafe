import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // นำเข้า Link เพิ่ม
import axios from "axios";
import CommentList from "../components/CommentList";
import RatingStars from "../components/RatingStars";

// 1. รับ props role มาจาก App.jsx
function CafeDetail({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cafe, setCafe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        const cafeRes = await axios.get(`http://localhost/backend/routes/cafes.php?id=${id}`);
        setCafe(cafeRes.data);

        const reviewRes = await axios.get(`http://localhost/backend/routes/reviews.php?cafe_id=${id}`);
        setComments(reviewRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchCafeData();
  }, [id]);

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
      // ไม่ต้องส่ง user_id ไปแล้ว ให้ Backend จัดการดึงจาก Session เอง
      const reviewData = {
        cafe_id: id,
        rating: rating,
        comment: commentText
      };

      // 2. ต้องใส่ withCredentials: true เสมอ เพื่อให้ส่ง Session Cookie ไปด้วย
      const res = await axios.post("http://localhost/backend/routes/reviews.php", reviewData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true 
      });

      if (res.data.status === "success") {
        alert("ขอบคุณสำหรับรีวิวครับ!");
        setRating(0);
        setCommentText("");
        
        // โหลดคอมเมนต์ใหม่ทันที
        const newReviewRes = await axios.get(`http://localhost/backend/routes/reviews.php?cafe_id=${id}`);
        setComments(newReviewRes.data);
      } else {
        alert("เกิดข้อผิดพลาด: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถส่งรีวิวได้ในขณะนี้");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (!cafe || cafe.status === "error") return <div className="text-center mt-5 alert alert-danger">ไม่พบข้อมูลคาเฟ่นี้</div>;

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &laquo; ย้อนกลับ
      </button>

      <div className="row">
        <div className="col-md-6 mb-4">
          <img 
            src={cafe.image ? `http://localhost/backend/img/${cafe.image}` : "https://placehold.co/600x400?text=No+Image"} 
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
              <strong>📍 ที่อยู่:</strong> <br/>{cafe.address}
            </div>
          )}
        </div>
      </div>

      <hr className="my-5" />

      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* 3. ดักเช็คว่าล็อกอินหรือยัง ถ้ามี role ถึงจะแสดงฟอร์ม */}
          {role ? (
            <div className="card shadow-sm mb-5 border-0 bg-light">
              <div className="card-body p-4">
                <h5 className="mb-3 fw-bold text-primary">เขียนรีวิวของคุณ</h5>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">ให้คะแนนร้านนี้</label>
                    <RatingStars rating={rating} onRatingChange={setRating} readOnly={false} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">ความคิดเห็นของคุณ</label>
                    <textarea 
                      className="form-control" rows="3" placeholder="บอกเล่าประสบการณ์ของคุณที่นี่..."
                      value={commentText} onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary px-4" disabled={isSubmitting}>
                    {isSubmitting ? "กำลังส่ง..." : "ส่งรีวิว"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center mb-5 shadow-sm">
              <span className="fs-5">🔒 กรุณา <Link to="/login" className="alert-link fw-bold text-decoration-underline">เข้าสู่ระบบ</Link> เพื่อเขียนรีวิวและให้คะแนนคาเฟ่นี้</span>
            </div>
          )}

          {/* ส่วนแสดงรายการคอมเมนต์ (โชว์ให้ทุกคนเห็น) */}
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default CafeDetail;