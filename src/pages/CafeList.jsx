import { useState, useEffect } from "react";
import axios from "axios";
import CafeCard from "../components/CafeCard";
import { useNavigate } from "react-router-dom";

function CafeList() {
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const [catRes, cafeRes] = await Promise.all([
          axios.get("http://localhost/backend/routes/categories.php"),
          axios.get("http://localhost/backend/routes/cafes.php")
        ]);
        
       
        if (Array.isArray(catRes.data)) setCategories(catRes.data);
        if (Array.isArray(cafeRes.data)) setCafes(cafeRes.data);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 
  const filteredCafes = selectedCategory === "all" 
    ? cafes 
    : cafes.filter(cafe => cafe.category_id === selectedCategory);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container mt-4 mb-5">
      <button 
        className="btn btn-outline-secondary mb-3" 
        onClick={() => navigate('/')}
      >
        &laquo; ย้อนกลับ
      </button>
      <h2 className="text-center mb-4 fw-bold">คาเฟ่ทั้งหมดของเรา</h2>

    
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4 border-bottom pb-3">
      
        <button 
          className={`btn rounded-pill px-4 ${selectedCategory === "all" ? "btn-primary shadow-sm" : "btn-outline-secondary"}`}
          onClick={() => setSelectedCategory("all")}
        >
          ทั้งหมด
        </button>
        
       
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={`btn rounded-pill px-4 ${selectedCategory === cat.id ? "btn-primary shadow-sm" : "btn-outline-secondary"}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

     
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredCafes.length > 0 ? (
          filteredCafes.map(cafe => (
            <div className="col" key={cafe.id}>
              <CafeCard cafe={cafe} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <h4 className="text-muted">😢 ไม่พบคาเฟ่ในหมวดหมู่นี้</h4>
            <button className="btn btn-outline-primary mt-3" onClick={() => setSelectedCategory("all")}>
              ดูคาเฟ่ทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CafeList;