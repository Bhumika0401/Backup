import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../api/api";
import Navbar from "../components/Navbar";
import "../styles/home.css";

export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/verify");

        if (!res.data.user) {
          nav("/login");
        }
      } catch (err) {
        nav("/login"); // 🔥 redirect if not logged in
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        <h2>Select Option</h2>

        <div className="options">
          <div className="card" onClick={() => nav("/create-poll")}>
            Create Poll
          </div>

          <div className="card" onClick={() => nav("/create-survey")}>
            Create Survey
          </div>
        </div>
      </div>
    </>
  );
}