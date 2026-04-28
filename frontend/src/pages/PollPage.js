// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { API } from "../api/api";
// // import Navbar from "../components/Navbar";

// // export default function PollPage() {
// //   const { id } = useParams();
// //   const [poll, setPoll] = useState(null);
// //   const [selected, setSelected] = useState(null);

// //   useEffect(() => {
// //     API.get(`/polls`).then(res => {
// //       const found = res.data.find(p => p._id === id);
// //       setPoll(found);
// //     });
// //   }, [id]);

// //   const vote = async () => {
// //     if (selected === null) {
// //       alert("Select an option");
// //       return;
// //     }

// //     try {
// //       await API.post(`/polls/${id}/vote`, {
// //         optionIndex: selected
// //       });

// //       alert("Vote submitted ✅");
// //     } catch (err) {
// //       alert(err.response?.data?.msg || "Error voting");
// //     }
// //   };

// //   if (!poll) return <div>Loading...</div>;

// //   return (
// //     <>
// //       <Navbar />

// //       <div style={{ padding: "40px", color: "white", background: "#0b1220", minHeight: "100vh" }}>
// //         <h2>{poll.question}</h2>

// //         {poll.options.map((opt, i) => (
// //           <div
// //             key={i}
// //             onClick={() => setSelected(i)}
// //             style={{
// //               padding: "10px",
// //               marginTop: "10px",
// //               background: selected === i ? "#22c55e" : "#1f2937",
// //               borderRadius: "8px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             {opt.text}
// //           </div>
// //         ))}

// //         <button
// //           onClick={vote}
// //           style={{
// //             marginTop: "20px",
// //             padding: "10px 20px",
// //             background: "#3b82f6",
// //             border: "none",
// //             borderRadius: "8px",
// //             color: "white",
// //             cursor: "pointer"
// //           }}
// //         >
// //           Submit Vote 🚀
// //         </button>
// //       </div>
// //     </>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { API } from "../api/api";
// import Navbar from "../components/Navbar";

// export default function PollPage() {
//   const { id } = useParams();
//   const nav = useNavigate();

//   const [poll, setPoll] = useState(null);
//   const [voted, setVoted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPoll();
//   }, []);

//   const fetchPoll = async () => {
//     try {
//       const res = await API.get(`/polls/${id}`);
//       setPoll(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const vote = async (index) => {
//     try {
//       await API.post(`/polls/${id}/vote`, {
//         optionIndex: index
//       });

//       setVoted(true);
//       fetchPoll(); // refresh results
//     } catch (err) {
//       alert("Vote failed");
//     }
//   };

//   if (loading) return <p style={{ color: "white" }}>Loading...</p>;
//   if (!poll) return <p style={{ color: "white" }}>Poll not found</p>;

//   return (
//     <>
//       <Navbar />

//       <style>{`
//         .page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
//           color: white;
//           padding: 20px;
//         }

//         .card {
//           width: 450px;
//           background: #111827;
//           padding: 25px;
//           border-radius: 18px;
//           box-shadow: 0 15px 40px rgba(0,0,0,0.6);
//         }

//         .question {
//           font-size: 20px;
//           font-weight: 700;
//           margin-bottom: 20px;
//           text-align: center;
//         }

//         .option {
//           background: #1f2937;
//           padding: 12px;
//           margin: 10px 0;
//           border-radius: 10px;
//           cursor: pointer;
//           transition: 0.2s;
//           display: flex;
//           justify-content: space-between;
//         }

//         .option:hover {
//           background: #374151;
//           transform: scale(1.02);
//         }

//         .bar {
//           height: 6px;
//           background: #22c55e;
//           border-radius: 10px;
//           margin-top: 5px;
//         }

//         .back {
//           width: 100%;
//           margin-top: 15px;
//           padding: 10px;
//           border: none;
//           border-radius: 10px;
//           background: #3b82f6;
//           color: white;
//           cursor: pointer;
//         }

//         .voted {
//           text-align: center;
//           color: #22c55e;
//           margin-bottom: 10px;
//         }
//       `}</style>

//       <div className="page">
//         <div className="card">

//           <div className="question">{poll.question}</div>

//           {voted && <div className="voted">✔ You voted</div>}

//           {poll.options.map((opt, i) => {
//             const totalVotes = poll.options.reduce((a, b) => a + b.votes, 0);
//             const percent = totalVotes
//               ? Math.round((opt.votes / totalVotes) * 100)
//               : 0;

//             return (
//               <div key={i}>
//                 <div
//                   className="option"
//                   onClick={() => !voted && vote(i)}
//                   style={{ opacity: voted ? 0.8 : 1 }}
//                 >
//                   <span>{opt.text}</span>
//                   <span>{opt.votes} votes</span>
//                 </div>

//                 {/* progress bar */}
//                 <div
//                   className="bar"
//                   style={{ width: `${percent}%` }}
//                 ></div>
//               </div>
//             );
//           })}

//           <button className="back" onClick={() => nav("/home")}>
//             ← Back to Home
//           </button>

//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Navbar from "../components/Navbar";

export default function PollPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoll();
  }, []);

//   const fetchPoll = async () => {
//     try {
//       const res = await API.get(`/polls/${id}`);
//       setPoll(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };
const fetchPoll = async () => {
  try {
    const res = await API.get(`/polls/${id}`);
    setPoll(res.data);
  } catch (err) {
    console.log("Poll load error:", err);
    setPoll(null);
  } finally {
    setLoading(false);
  }
};
  const vote = async (index) => {
    try {
      await API.post(`/polls/${id}/vote`, {
        optionIndex: index
      });

      setVoted(true);
      fetchPoll(); // refresh updated votes
    } catch (err) {
      alert("Vote failed");
    }
  };

  const getTotalVotes = () =>
    poll.options.reduce((sum, o) => sum + o.votes, 0);

  const getPercent = (votes) => {
    const total = getTotalVotes();
    return total ? Math.round((votes / total) * 100) : 0;
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

if (!poll)
  return (
    <div style={{ color: "white", textAlign: "center", marginTop: 50 }}>
      Poll not found ❌
      <br />
      <button onClick={() => nav("/polls")}>Back</button>
    </div>
  );
  return (
    <>
      <Navbar />

      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          color: white;
          padding: 20px;
        }

        .card {
          width: 500px;
          background: #111827;
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(0,0,0,0.6);
        }

        .question {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 25px;
          text-align: center;
        }

        .option {
          background: #1f2937;
          padding: 12px;
          margin: 10px 0;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .option:hover {
          background: #374151;
          transform: scale(1.02);
        }

        .option.disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .bar-bg {
          height: 6px;
          background: #0f172a;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 6px;
        }

        .bar-fill {
          height: 6px;
          background: linear-gradient(90deg, #22c55e, #3b82f6);
          transition: width 0.5s ease-in-out;
        }

        .voted {
          text-align: center;
          color: #22c55e;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .back {
          width: 100%;
          margin-top: 20px;
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          font-size: 15px;
        }

        .back:hover {
          background: #2563eb;
        }

        .votes-text {
          font-size: 12px;
          color: #9ca3af;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <div className="question">{poll.question}</div>

          {voted && <div className="voted">✔ You voted successfully</div>}

          {poll.options.map((opt, i) => {
            const percent = getPercent(opt.votes);

            return (
              <div key={i}>

                <div
                  className={`option ${voted ? "disabled" : ""}`}
                  onClick={() => !voted && vote(i)}
                >
                  <span>{opt.text}</span>
                  <span className="votes-text">{opt.votes} votes</span>
                </div>

                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>

              </div>
            );
          })}

          <button className="back" onClick={() => nav("/polls")}>
            ← Back to Polls
          </button>

        </div>
      </div>
    </>
  );
}