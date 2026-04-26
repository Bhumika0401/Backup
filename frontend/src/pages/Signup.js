import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";
import "../styles/login.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful");

      // 🔥 after signup go to login
      nav("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Sign Up</button>

        {/* 🔥 BACK TO LOGIN BUTTON */}
        <button
          onClick={() => nav("/")}
          style={{
            marginTop: "10px",
            background: "transparent",
            color: "blue",
            border: "none",
            cursor: "pointer"
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}