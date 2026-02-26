import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [stats, setStats] = useState({
    users: 0,
    cafes: 0,
    categories: 0,
    views: 0
  });

  useEffect(() => {
    axios.get(
      "http://localhost/backend/routes/Admin.php",
      { withCredentials: true }
    ).then(res => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>ผู้ใช้</h5>
            <h3>{stats.users}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>คาเฟ่</h5>
            <h3>{stats.cafes}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>หมวดหมู่</h5>
            <h3>{stats.categories}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow">
            <h5>ยอดเข้าชม</h5>
            <h3>{stats.views}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;