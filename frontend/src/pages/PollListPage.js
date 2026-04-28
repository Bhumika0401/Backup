// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import Navbar from "../components/Navbar";

// export default function PollListPage() {
//   const [polls, setPolls] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     API.get("/polls").then(res => setPolls(res.data));
//   }, []);

//   return (
//     <>
//       <Navbar />

//       <div style={{ padding: "30px", color: "white" }}>
//         <h2>All Polls 📊</h2>

//         {polls.map(p => (
//           <div
//             key={p._id}
//             onClick={() => nav(`/poll/${p._id}`)}
//             style={{
//               padding: "12px",
//               margin: "10px 0",
//               background: "#1f2937",
//               borderRadius: "10px",
//               cursor: "pointer"
//             }}
//           >
//             {p.question}
//           </div>
//         ))}

//         <button onClick={() => nav("/create-poll")}>
//           + Create Poll
//         </button>

//         <button onClick={() => nav("/home")}>
//           ← Back Home
//         </button>
//       </div>
//     </>
//   );
// }



// import { useEffect, useState } from "react";
// import { API } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function PollListPage() {
//   const [polls, setPolls] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [visible, setVisible] = useState(5);
//   const nav = useNavigate();

//   useEffect(() => {
//     API.get("/polls").then(res => setPolls(res.data));
//   }, []);

//   const filtered = polls.filter(p =>
//     category === "all" || (p.type || "").toLowerCase() === category
//   );

//   return (
//     <>
//       <Navbar />

//       <div style={{ padding: "30px", color: "white" }}>

//         <h2>Polls 📊</h2>

//         {/* CATEGORY FILTER */}
//         <div style={{ marginBottom: 20 }}>
//           {["all", "student", "teacher", "general"].map(c => (
//             <button
//               key={c}
//               onClick={() => setCategory(c)}
//               style={{
//                 margin: 5,
//                 padding: 8,
//                 background: category === c ? "#3b82f6" : "#1f2937",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 10
//               }}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         {/* POLLS */}
//         {filtered.slice(0, visible).map(p => (
//           <div
//             key={p._id}
//             onClick={() => nav(`/poll/${p._id}`)}
//             style={{
//               padding: 12,
//               margin: 10,
//               background: "#1f2937",
//               borderRadius: 10,
//               cursor: "pointer"
//             }}
//           >
//             {p.question}
//           </div>
//         ))}

//         {/* LOAD MORE */}
//         {visible < filtered.length && (
//           <button
//             onClick={() => setVisible(v => v + 5)}
//             style={{
//               marginTop: 20,
//               padding: 10,
//               background: "#22c55e",
//               border: "none",
//               borderRadius: 10
//             }}
//           >
//             Load More
//           </button>
//         )}

//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PollListPage() {
  const [polls, setPolls] = useState([]);
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(5);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/polls").then(res => setPolls(res.data));
  }, []);

  const filtered = polls.filter(p =>
    category === "all" || (p.type || "").toLowerCase() === category
  );

  return (
    <>
      <Navbar />

      <style>{`
        .page {
          min-height: 100vh;
          padding: 30px;
          background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          color: white;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
        }

        .create-btn {
          background: #22c55e;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }

        /* CATEGORY CHIPS */
        .chips {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }

        .chip {
          padding: 8px 14px;
          border-radius: 20px;
          background: #1f2937;
          cursor: pointer;
          transition: 0.2s;
          font-size: 14px;
        }

        .chip.active {
          background: #3b82f6;
        }

        /* POLL CARD */
        .poll-card {
          background: #111827;
          padding: 16px;
          border-radius: 14px;
          margin-bottom: 15px;
          cursor: pointer;
          transition: 0.2s;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .poll-card:hover {
          transform: scale(1.02);
          background: #1f2937;
        }

        .question {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .option {
          font-size: 13px;
          color: #9ca3af;
        }

        .footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }

        .load {
          background: #22c55e;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }

        .back {
          background: #3b82f6;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
        }
          .poll-card {
  background: #111827;
  padding: 18px;
  border-radius: 14px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: 0.25s ease;
  border: 1px solid rgba(255,255,255,0.05);
}

.poll-card:hover {
  transform: translateY(-4px);
  background: #1f2937;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.question {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 6px;
}

.meta {
  font-size: 12px;
  color: #9ca3af;
}
      `}</style>

      <div className="page">

        {/* HEADER */}
        <div className="header">
          <div className="title">📊 Polls Dashboard</div>

          <button
            className="create-btn"
            onClick={() => nav("/create-poll")}
          >
            + Create Poll
          </button>
        </div>

        {/* CATEGORY FILTER */}
        <div className="chips">
          {["all", "student", "teacher", "general"].map(c => (
            <div
              key={c}
              className={`chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c.toUpperCase()}
            </div>
          ))}
        </div>

        {/* POLLS */}
        {/* {filtered.slice(0, visible).map(p => (
          <div
            key={p._id}
            className="poll-card"
            onClick={() => nav(`/poll/${p._id}`)}
          >
            <div className="question">{p.question}</div>

            <div className="options">
              {p.options?.slice(0, 2).map((o, i) => (
                <div key={i} className="option">
                  • {o.text}
                </div>
              ))}

              {p.options?.length > 2 && (
                <div className="option">+ more options</div>
              )}
            </div>
          </div>
        ))} */}
        {filtered.slice(0, visible).map(p => (
  <div
    key={p._id}
    className="poll-card"
    onClick={() => nav(`/poll/${p._id}`)}
  >
    <div className="question">❓ {p.question}</div>

    <div className="meta">
      {p.type ? `#${p.type}` : "#general"} • Tap to vote
    </div>
  </div>
))}

        {/* FOOTER BUTTONS */}
        <div className="footer">

          {visible < filtered.length && (
            <button
              className="load"
              onClick={() => setVisible(v => v + 5)}
            >
              Load More
            </button>
          )}

          <button className="back" onClick={() => nav("/home")}>
            ← Home
          </button>

        </div>

      </div>
    </>
  );
}