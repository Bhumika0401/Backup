import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const nav = useNavigate();

  return (
    <>
      {/* NAVBAR (THIS IS CORRECT PLACE) */}
      <Navbar />

      {/* GLOBAL STYLE */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #0f172a;
        }

        .home-container {
          min-height: 100vh;
          padding: 40px;
          color: white;
          background: linear-gradient(-45deg, #0f172a, #1e293b, #0b1220, #1e3a8a);
          background-size: 400% 400%;
          animation: gradientMove 10s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero {
          text-align: center;
          margin-bottom: 50px;
        }

        .hero h1 {
          font-size: 44px;
          margin-bottom: 10px;
        }

        .hero p {
          color: #cbd5e1;
          font-size: 18px;
        }

        .card-container {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .card {
          width: 300px;
          padding: 25px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          text-align: center;
          cursor: pointer;
          transition: 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card:hover {
          transform: translateY(-12px) scale(1.03);
          background: rgba(255,255,255,0.15);
        }

        .icon {
          font-size: 45px;
          margin-bottom: 10px;
        }

        .card h3 {
          margin: 10px 0;
          font-size: 22px;
        }

        .card p {
          font-size: 14px;
          color: #cbd5e1;
        }

        .card button {
          margin-top: 15px;
          padding: 10px 16px;
          border: none;
          border-radius: 10px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .card button:hover {
          background: #2563eb;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
          }

          .card {
            width: 90%;
          }
        }
      `}</style>

      {/* PAGE CONTENT */}
      <div className="home-container">

        <div className="hero">
          <h1>Survey Hub 🚀</h1>
          <p>Create polls & surveys and get instant insights</p>
        </div>

        <div className="card-container">

          <div className="card" onClick={() => nav("/create-poll")}>
            <div className="icon">📊</div>
            <h3>Create Poll</h3>
            <p>Quick voting system with instant results</p>
            <button>Start Poll</button>
          </div>

          <div className="card" onClick={() => nav("/create-survey")}>
            <div className="icon">📝</div>
            <h3>Create Survey</h3>
            <p>Detailed multi-question feedback system</p>
            <button>Create Survey</button>
          </div>

        </div>

      </div>
    </>
  );
}
