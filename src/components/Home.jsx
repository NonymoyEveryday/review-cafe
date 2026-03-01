import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CafeCard from "./CafeCard";
import "./Home.css"; 

function Home() {
  const [popularCafes, setPopularCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchPopularCafes = async () => {
      try {
        const res = await axios.get("http://localhost/backend/routes/cafes.php");
        
     
        const sortedCafes = res.data.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        
    
        setPopularCafes(sortedCafes.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPopularCafes();
  }, []);

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      
      navigate(`/cafes?search=${searchQuery}`);
    }
  };

  return (
    <div className="mb-5">
      
      <div className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-5 shadow">
        <h1 className="fw-bold display-4 mb-3"> แอ่วไหนดี </h1>
        <p className="lead mb-4">หาที่แอ่ว ให้กับคนหลายแนว ตั้งแต่ลูกคุณหนูยันหมูตกน้ำ ปะเซาะแอ่วกัน </p>
        
        <form onSubmit={handleSearch} className="b1">
          <input 
            type="text" 
            className="form-control form-control-lg border-0" 
            placeholder="ค้นหาชื่อคาเฟ่ที่สนใจ..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: "30px 0 0 30px", paddingLeft: "25px" }}
          />
          <button 
            type="submit" 
            className="btn btn-primary btn-lg px-4 border-0"
            style={{ borderRadius: "0 30px 30px 0", backgroundColor: "#7a6c9e" }}
          >
            ค้นหาเลย
          </button>
        </form>
      </div>

     
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="fw-bold mb-0">สถานที่คนแอ่วหลาย</h2>
          <button className="btn btn-outline-secondary" onClick={() => navigate('/cafes')}>
            ดูคาเฟ่ทั้งหมด &raquo;
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">กำลังโหลดคาเฟ่ยอดฮิต...</p>
          </div>
        ) : (
          <div className="row">
            {popularCafes.length > 0 ? (
              popularCafes.map(cafe => (
                <div key={cafe.id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <CafeCard cafe={cafe} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted p-5 border rounded bg-light">
                <h5>ยังไม่มีข้อมูลคาเฟ่ในระบบ</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;