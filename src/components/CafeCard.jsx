import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars"; 

function CafeCard({ cafe }) {
  const navigate = useNavigate();

  return (
    <div className="card h-100 shadow-sm" style={{ cursor: "pointer" }} onClick={() => navigate(`/cafe/${cafe.id}`)}>
      <img 
        src={cafe.image ? `http://localhost/backend/img/${cafe.image}` : "https://placehold.co/600x400?text=No+Image"} 
        className="card-img-top" 
        alt={cafe.name} 
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold text-truncate">{cafe.name}</h5>
        
       
        <div className="d-flex align-items-center mb-2">
          <RatingStars rating={cafe.avg_rating || 0} readOnly={true} />
          <small className="ms-2 text-muted">
            ({cafe.avg_rating > 0 ? cafe.avg_rating : "ยังไม่มีรีวิว"})
          </small>
        </div>

        <p className="card-text text-muted" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {cafe.description}
        </p>
      </div>
      <div className="card-footer bg-white border-top-0">
        <small className="text-muted">👁️ {cafe.view_count || 0} views</small>
      </div>
    </div>
  );
}

export default CafeCard;