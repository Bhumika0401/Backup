// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import "../styles/login.css";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const register = async () => {
//     try {
//       await API.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       alert("Signup successful");

//       // 🔥 after signup go to login
//       nav("/");
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <h2>Signup</h2>

//         <input
//           placeholder="Name"
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button onClick={register}>Sign Up</button>

//         {/* 🔥 BACK TO LOGIN BUTTON */}
//         <button
//           onClick={() => nav("/")}
//           style={{
//             marginTop: "10px",
//             background: "transparent",
//             color: "blue",
//             border: "none",
//             cursor: "pointer"
//           }}
//         >
//           Already have an account? Login
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";

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

      alert("Signup successful 🚀");
      nav("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <>
      {/* INLINE STYLES */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .signup-page {
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

        .signup-card {
          width: 350px;
          padding: 30px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          text-align: center;
          color: white;
        }

        .signup-card h2 {
          margin-bottom: 20px;
          font-size: 26px;
        }

        .signup-card input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .signup-card input::placeholder {
          color: #cbd5e1;
        }

        .signup-card button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: none;
          border-radius: 10px;
          background: #22c55e;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .signup-card button:hover {
          background: #16a34a;
          transform: scale(1.03);
        }

        .login-btn {
          margin-top: 10px;
          background: transparent;
          color: #60a5fa;
          border: none;
          cursor: pointer;
          font-size: 13px;
        }

        .login-btn:hover {
          text-decoration: underline;
        }

        @media (max-width: 500px) {
          .signup-card {
            width: 90%;
          }
        }
      `}</style>

      {/* PAGE */}
      <div className="signup-page">
        <div className="signup-card">

          <h2>Create Account ✨</h2>

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

          <button
            className="login-btn"
            onClick={() => nav("/")}
          >
            Already have an account? Login
          </button>

        </div>
      </div>
    </>
  );
}
