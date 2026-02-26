import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CafeCard from "./CafeCard";
import "./Home.css"; // ไฟล์ CSS สำหรับตกแต่งแบนเนอร์

function Home() {
  const [popularCafes, setPopularCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลคาเฟ่เพื่อมาแสดงในหมวดยอดนิยม
    const fetchPopularCafes = async () => {
      try {
        const res = await axios.get("http://localhost/backend/routes/cafes.php");
        
        // จัดเรียงคาเฟ่ตามยอดวิว (view_count) จากมากไปน้อย
        const sortedCafes = res.data.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        
        // ตัดมาโชว์แค่ 3 อันดับแรก
        setPopularCafes(sortedCafes.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPopularCafes();
  }, []);

  // ฟังก์ชันจัดการเมื่อกดค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // ส่งคำค้นหาไปที่หน้า /cafes ผ่าน Query String
      navigate(`/cafes?search=${searchQuery}`);
    }
  };

  return (
    <div className="mb-5">
      {/* ================= Hero Section (ส่วนแบนเนอร์และค้นหา) ================= */}
      <div className="hero-section text-center text-white d-flex flex-column justify-content-center align-items-center mb-5 shadow">
        <h1 className="fw-bold display-4 mb-3">ค้นหาคาเฟ่ที่ใช่ สำหรับคุณ ☕</h1>
        <p className="lead mb-4">รีวิวคาเฟ่ บรรยากาศดี กาแฟอร่อย ที่เรารวบรวมมาให้คุณแล้ว</p>
        
        <form onSubmit={handleSearch} className="search-form d-flex w-50 shadow-sm">
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
            style={{ borderRadius: "0 30px 30px 0", backgroundColor: "#ff8c00" }}
          >
            ค้นหาเลย
          </button>
        </form>
      </div>

      {/* ================= Popular Cafes Section (คาเฟ่ยอดนิยม) ================= */}
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="fw-bold mb-0">🔥 คาเฟ่ยอดนิยม</h2>
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