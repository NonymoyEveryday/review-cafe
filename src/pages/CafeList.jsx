import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import CafeCard from "../components/CafeCard";

function CafeList() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || ""; 

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


  const filteredCafes = cafes.filter(cafe => {
  
    const matchCategory = selectedCategory === "all" || cafe.category_id === selectedCategory;
    
    
    let matchSearch = true;
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const matchName = cafe.name.toLowerCase().includes(lowerCaseQuery);
      const matchDesc = cafe.description && cafe.description.toLowerCase().includes(lowerCaseQuery);
      matchSearch = matchName || matchDesc;
    }

    return matchCategory && matchSearch;
  });

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/')}>
        &laquo; กลับหน้าหลัก
      </button>

     
      <h2 className="text-center mb-4 fw-bold text-dark">
        {searchQuery ? `ผลการค้นหาสำหรับ: "${searchQuery}"` : "คาเฟ่ทั้งหมดลึ่งของเรา"}
      </h2>

    
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
            <h4 className="text-muted"> ไม่พบคาเฟ่ที่คุณค้นหา</h4>
            {searchQuery && (
              <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/cafes')}>
                ล้างการค้นหา
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CafeList;