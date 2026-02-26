import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import RatingStars from "../components/RatingStars";
import CommentList from "../components/CommentList";

function CafeDetail() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get(`routes/cafes.php/${id}`).then(res => setCafe(res.data));
    api.get(`routes/reviews.php/${id}`).then(res => setComments(res.data));
  }, [id]);

  if (!cafe) return <p>Loading...</p>;

  return (
    <div> 
      <h2>{cafe.name}</h2>
      <img
        src={cafe.image}
        alt={cafe.name}
        className="img-fluid mb-3"
      />
      <p>{cafe.description}</p>

      <RatingStars rating={cafe.rating || 4} />

      <CommentList comments={comments} />
    </div>
  );
}

export default CafeDetail;