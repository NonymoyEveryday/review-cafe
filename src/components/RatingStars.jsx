import { useState } from "react";

function RatingStars({ rating = 0, onRatingChange, readOnly = false }) {
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
            
            onClick={() => !readOnly && onRatingChange && onRatingChange(starValue)}
           
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            style={{
              fontSize: "1.5rem",
              color: starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              transition: "color 0.2s"
            }}
            title={readOnly ? `${rating} ดาว` : `ให้ ${starValue} ดาว`}
          >
            ★
          </span>
        );
      })}
      
      
      {readOnly && (
        <span className="ms-2 text-muted small mt-1">
          {Number(rating).toFixed(1)} / 5
        </span>
      )}
    </div>
  );
}

export default RatingStars;