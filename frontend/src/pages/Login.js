import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      await API.post("/auth/login", { email, password });
      nav("/home");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Poll System</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        {/* 🔥 SIGNUP BUTTON */}
        <button
          onClick={() => nav("/signup")}
          style={{
            marginTop: "10px",
            background: "transparent",
            color: "blue",
            border: "none",
            cursor: "pointer"
          }}
        >
          Don't have an account? Sign Up
        </button>

        <br />

        <a href="http://localhost:5001/api/auth/google">
          Login with Google
        </a>
      </div>
    </div>
  );
}