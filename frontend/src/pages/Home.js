import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { API } from "../api/api";

export default function Home() {
  const nav = useNavigate();

  const [polls, setPolls] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchPolls();
    fetchSurveys();
  }, []);

  const fetchPolls = async () => {
    try {
      const res = await API.get("/polls");
      setPolls(res.data || []);
    } catch {
      setPolls([]);
    }
  };

  const fetchSurveys = async () => {
    try {
      const res = await API.get("/surveys");
      setSurveys(res.data || []);
    } catch {
      setSurveys([]);
    }
  };

  // ✅ FIXED POLL FILTER
  const filteredPolls = polls.filter(p => {
    if (category === "all") return true;
    return (p.type || "").toLowerCase() === category.toLowerCase();
  });

  // ✅ FIXED SURVEY FILTER
  const filteredSurveys = surveys.filter(s => {
    if (category === "all") return true;
    return (s.category || "").toLowerCase() === category.toLowerCase();
  });

  return (
    <>
      <Navbar />

      <style>{`
        .home-container{
          min-height:100vh;
          padding:40px;
          color:white;
          background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
        }

        .hero{
          text-align:center;
          margin-bottom:30px;
        }

        .hero h1{
          font-size:38px;
          font-weight:800;
        }

        .category-bar{
          display:flex;
          justify-content:center;
          gap:10px;
          margin-bottom:30px;
        }

        .category-bar button{
          padding:8px 16px;
          border:none;
          border-radius:20px;
          background:#1f2937;
          color:white;
          cursor:pointer;
        }

        .active-cat{
          background:#3b82f6 !important;
        }

        .container{
          display:flex;
          justify-content:center;
          gap:40px;
          flex-wrap:wrap;
        }

        .card{
          width:400px;
          border-radius:18px;
          background:#111827;
          padding:20px;
        }

        .title{
          font-size:20px;
          font-weight:700;
          margin-bottom:15px;
        }

        .item{
          padding:10px;
          margin:8px 0;
          background:#1f2937;
          border-radius:10px;
          cursor:pointer;
        }

        .item:hover{
          background:#374151;
        }

        .btn{
          width:100%;
          padding:10px;
          margin-top:10px;
          border:none;
          border-radius:10px;
          cursor:pointer;
          color:white;
          font-weight:bold;
        }
      `}</style>

      <div className="home-container">

        <div className="hero">
          <h1>Start Answering 🚀</h1>
        </div>

        {/* CATEGORY */}
        <div className="category-bar">
          {["all", "student", "teacher", "general"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={category === cat ? "active-cat" : ""}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="container">

          {/* POLLS */}
          <div className="card">
            <div className="title">📊 Polls</div>

            <button
              className="btn"
              style={{ background: "#22c55e" }}
              onClick={() => nav("/polls")}
            >
              Open Polls
            </button>

            {filteredPolls.slice(0, 5).map(p => (
              <div
                key={p._id}
                className="item"
                onClick={() => nav(`/poll/${p._id}`)}
              >
                {p.question}
              </div>
            ))}
          </div>

          {/* SURVEYS */}
          <div className="card">
            <div className="title">🧠 Surveys</div>

            {/* <button
              className="btn"
              style={{ background: "#3b82f6" }}
              onClick={() => nav("/create-survey")}
            >
              Create Survey
            </button> */}

            <button
              className="btn"
              style={{ background: "#3b82f6" }}
              onClick={() => nav("/surveys")}
            >
              Open Surveys
            </button>

            {filteredSurveys.slice(0, 5).map(s => (
              <div
                key={s._id}
                className="item"
                onClick={() => nav(`/survey/${s._id}`)}
              >
                {s.title}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}