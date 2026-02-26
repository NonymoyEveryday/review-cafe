import { Link } from "react-router-dom";

function CafeCard({ cafe }) {
  return (
    <div className="card mb-3">
      <img
        src={cafe.image}
        className="card-img-top"
        alt={cafe.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5>{cafe.name}</h5>
        <p>{cafe.description}</p>
        <Link to={`/cafe/${cafe.id}`} className="btn btn-primary">
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}

export default CafeCard;