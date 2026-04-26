// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import "../styles/login.css";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const login = async () => {
//     try {
//       await API.post("/auth/login", { email, password });
//       nav("/home");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Poll System</h2>

//         <input
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button onClick={login}>Login</button>

//         {/* 🔥 SIGNUP BUTTON */}
//         <button
//           onClick={() => nav("/signup")}
//           style={{
//             marginTop: "10px",
//             background: "transparent",
//             color: "blue",
//             border: "none",
//             cursor: "pointer"
//           }}
//         >
//           Don't have an account? Sign Up
//         </button>

//         <br />

//         <a href="http://localhost:5001/api/auth/google">
//           Login with Google
//         </a>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

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
    <>
      {/* INLINE STYLE */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .login-page {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(-45deg, #0f172a, #1e293b, #0b1220, #1e3a8a);
          background-size: 400% 400%;
          animation: gradientMove 10s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .login-card {
          width: 340px;
          padding: 30px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          text-align: center;
          color: white;
        }

        .login-card h2 {
          margin-bottom: 20px;
          font-size: 26px;
        }

        .login-card input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .login-card input::placeholder {
          color: #cbd5e1;
        }

        .login-card button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: none;
          border-radius: 10px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-card button:hover {
          background: #2563eb;
          transform: scale(1.03);
        }

        .signup-btn {
          margin-top: 10px;
          background: transparent;
          color: #60a5fa;
          border: none;
          cursor: pointer;
          font-size: 13px;
        }

        .signup-btn:hover {
          text-decoration: underline;
        }

        .google-link {
          display: inline-block;
          margin-top: 15px;
          color: #22c55e;
          text-decoration: none;
          font-size: 14px;
        }

        .google-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 500px) {
          .login-card {
            width: 90%;
          }
        }
      `}</style>

      {/* PAGE */}
      <div className="login-page">
        <div className="login-card">

          <h2>Poll System 🔐</h2>

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

          <button
            className="signup-btn"
            onClick={() => nav("/signup")}
          >
            Don't have an account? Sign Up
          </button>

          <a
            className="google-link"
            href="http://localhost:5001/api/auth/google"
          >
            Continue with Google
          </a>

        </div>
      </div>
    </>
  );
}
