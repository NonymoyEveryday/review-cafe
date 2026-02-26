import { useState } from "react";

function RatingStars({ rating = 0, onRatingChange, readOnly = false }) {
  // state สำหรับเก็บค่าตอนเอาเมาส์ไปชี้ (Hover) เพื่อพรีวิวดาวก่อนกด
  const [hover, setHover] = useState(0);

  return (
    <div 
      className="d-flex align-items-center" 
      style={{ gap: "4px", cursor: readOnly ? "default" : "pointer" }}
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <span
            key={starValue}
            // ถ้าระบุว่าไม่ใช่ readOnly ถึงจะยอมให้คลิกเพื่ออัปเดตคะแนนได้
            onClick={() => !readOnly && onRatingChange && onRatingChange(starValue)}
            // เอฟเฟกต์ตอนเอาเมาส์ชี้
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            style={{
              fontSize: "1.5rem",
              // ถ้าดาวดวงนี้ค่าน้อยกว่าหรือเท่ากับคะแนน (หรือค่า hover) ให้เป็นสีทอง ถ้าไม่ใช่ให้เป็นสีเทา
              color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              transition: "color 0.2s"
            }}
            title={readOnly ? `${rating} ดาว` : `ให้ ${starValue} ดาว`}
          >
            ★
          </span>
        );
      })}
      
      {/* ถ้าเป็นโหมดอ่านอย่างเดียว ให้แสดงตัวเลขกำกับไว้ด้านหลังด้วย */}
      {readOnly && (
        <span className="ms-2 text-muted small mt-1">
          {Number(rating).toFixed(1)} / 5
        </span>
      )}
    </div>
  );
}

export default RatingStars;