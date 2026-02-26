import { useEffect, useState } from "react";
import CafeCard from "../components/CafeCard";
import api from "../services/api";

function CafeList() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    api.get("routes/cafes.php").then(res => setCafes(res.data));
  }, []);

  return (
    <div>
      <h2>คาเฟ่ทั้งหมด</h2>
      {cafes.map(cafe => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
}

export default CafeList;