// // import { useEffect, useState } from "react";
// // import { API } from "../api/api";
// // import Navbar from "../components/Navbar";

// // export default function CreatePoll() {
// //   const [questions, setQuestions] = useState([]);
// //   const [selected, setSelected] = useState([]);
// //   const [visibleCount, setVisibleCount] = useState(4);

// //   useEffect(() => {
// //     API.get("/questions").then((res) => setQuestions(res.data));
// //   }, []);

// //   const toggleSelect = (id) => {
// //     setSelected((prev) =>
// //       prev.includes(id)
// //         ? prev.filter((q) => q !== id)
// //         : [...prev, id]
// //     );
// //   };

// //   const createPoll = async () => {
// //     try {
// //       await API.post("/polls", { questions: selected });
// //       alert("Poll Created 🚀");
// //       setSelected([]);
// //     } catch (err) {
// //       alert("Error creating poll");
// //     }
// //   };

// //   const loadMore = () => {
// //     setVisibleCount((prev) => prev + 4);
// //   };

// //   return (
// //     <>
// //       <Navbar />

// //       <style>{`
// //         *{
// //           margin:0;
// //           padding:0;
// //           box-sizing:border-box;
// //           font-family:Arial, sans-serif;
// //         }

// //         .poll-page{
// //           min-height:100vh;
// //           padding:40px 20px;
// //           background:linear-gradient(135deg,#0f172a,#1e293b,#0b1220);
// //           color:white;
// //         }

// //         .title{
// //           text-align:center;
// //           font-size:32px;
// //           margin-bottom:30px;
// //         }

// //         .question-list{
// //           display:flex;
// //           flex-direction:column;
// //           gap:12px;
// //           align-items:center;
// //         }

// //         .card{
// //           width:55%;
// //           padding:12px 18px;
// //           border-radius:12px;
// //           background:rgba(255,255,255,0.08);
// //           display:flex;
// //           justify-content:space-between;
// //           align-items:center;
// //           cursor:pointer;
// //           transition:0.3s;
// //         }

// //         .card:hover{
// //           transform:scale(1.02);
// //         }

// //         .selected{
// //           border:1px solid #22c55e;
// //           background:rgba(34,197,94,0.15);
// //         }

// //         .checkbox{
// //           width:18px;
// //           height:18px;
// //           accent-color:#22c55e;
// //         }

// //         .plus-btn{
// //           width:45px;
// //           height:45px;
// //           border:none;
// //           border-radius:50%;
// //           background:#22c55e;
// //           color:white;
// //           font-size:28px;
// //           cursor:pointer;
// //           margin-top:20px;
// //         }

// //         .create-btn{
// //           margin-top:25px;
// //           padding:12px 28px;
// //           border:none;
// //           border-radius:10px;
// //           background:#3b82f6;
// //           color:white;
// //           cursor:pointer;
// //           font-size:16px;
// //         }

// //         .center{
// //           text-align:center;
// //         }

// //         @media(max-width:768px){
// //           .card{
// //             width:90%;
// //           }
// //         }
// //       `}</style>

// //       <div className="poll-page">
// //         <h2 className="title">Create Poll 📊</h2>

// //         <div className="question-list">
// //           {questions.slice(0, visibleCount).map((q) => {
// //             const isSelected = selected.includes(q._id);

// //             return (
// //               <div
// //                 key={q._id}
// //                 className={`card ${isSelected ? "selected" : ""}`}
// //                 onClick={() => toggleSelect(q._id)}
// //               >
// //                 <span>{q.text}</span>

// //                 <input
// //                   type="checkbox"
// //                   checked={isSelected}
// //                   onChange={() => toggleSelect(q._id)}
// //                   className="checkbox"
// //                 />
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {visibleCount < questions.length && (
// //           <div className="center">
// //             <button className="plus-btn" onClick={loadMore}>
// //               +
// //             </button>
// //           </div>
// //         )}

// //         <div className="center">
// //           <button className="create-btn" onClick={createPoll}>
// //             Create Poll 🚀
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // // }
// // import { useState } from "react";
// // import { API } from "../api/api";

// // export default function CreatePoll() {
// //   const [question, setQuestion] = useState("");
// //   const [type, setType] = useState("student");
// //   const [options, setOptions] = useState(["", ""]);
// // const nav = useNavigate();
// //   const addOption = () => {
// //     setOptions([...options, ""]);
// //   };

// //   const updateOption = (value, index) => {
// //     const updated = [...options];
// //     updated[index] = value;
// //     setOptions(updated);
// //   };

// //   const create = async () => {
// //     try {
// //       const formattedOptions = options
// //         .filter((o) => o.trim() !== "")
// //         .map((o) => ({ text: o, votes: 0 }));

// //    await API.post("/polls", {
// //   question,
// //   type,
// //   options: options.map(o => ({ text: o }))
// // });;

// //       alert("Poll Created 🚀");
// //     nav("/home");
// //       setQuestion("");
// //       setType("student");
// //       setOptions(["", ""]);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error creating poll");
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         *{
// //           margin:0;
// //           padding:0;
// //           box-sizing:border-box;
// //           font-family:Arial, sans-serif;
// //         }

// //         .page{
// //           min-height:100vh;
// //           display:flex;
// //           justify-content:center;
// //           align-items:center;
// //           padding:30px;
// //           background:radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
// //           color:white;
// //         }

// //         /* MAIN CARD */
// //         .card{
// //           width:500px;
// //           padding:25px;
// //           border-radius:18px;

// //           background:#111827;
// //           border:1px solid rgba(255,255,255,0.08);

// //           box-shadow:0 15px 40px rgba(0,0,0,0.5);
// //         }

// //         /* TITLE */
// //         .title{
// //           text-align:center;
// //           font-size:26px;
// //           font-weight:700;
// //           margin-bottom:20px;
// //         }

// //         /* SECTION LABEL */
// //         .label{
// //           font-size:13px;
// //           color:#9ca3af;
// //           margin:12px 0 6px;
// //         }

// //         input, select{
// //           width:100%;
// //           padding:12px;
// //           border-radius:10px;
// //           border:none;
// //           outline:none;
// //           background:#1f2937;
// //           color:white;
// //           font-size:14px;
// //         }

// //         input::placeholder{
// //           color:#6b7280;
// //         }

// //         select option{
// //           color:black;
// //         }

// //         /* OPTION ROW */
// //         .option-row{
// //           margin:8px 0;
// //         }

// //         /* BUTTONS */
// //         .btn{
// //           width:100%;
// //           padding:12px;
// //           margin-top:12px;
// //           border:none;
// //           border-radius:10px;
// //           font-size:14px;
// //           cursor:pointer;
// //           transition:0.3s;
// //         }

// //         .add{
// //           background:#22c55e;
// //           color:white;
// //         }

// //         .add:hover{
// //           background:#16a34a;
// //         }

// //         .create{
// //           background:#3b82f6;
// //           color:white;
// //         }

// //         .create:hover{
// //           background:#2563eb;
// //           transform:scale(1.02);
// //         }

// //         /* SMALL HOVER LIFT */
// //         .card:hover{
// //           transform:translateY(-5px);
// //           transition:0.3s;
// //         }
// //       `}</style>

// //       <div className="page">

// //         <div className="card">

// //           <div className="title">Create Poll 📊</div>

// //           {/* QUESTION */}
// //           <div className="label">Question</div>
// //           <input
// //             placeholder="Enter your poll question..."
// //             value={question}
// //             onChange={(e) => setQuestion(e.target.value)}
// //           />

// //           {/* TYPE */}
// //           <div className="label">Category</div>
// //           <select value={type} onChange={(e) => setType(e.target.value)}>
// //             <option value="student">Student</option>
// //             <option value="teacher">Teacher</option>
// //             <option value="general">General</option>
// //           </select>

// //           {/* OPTIONS */}
// //           <div className="label">Options</div>

// //           {options.map((opt, i) => (
// //             <div className="option-row" key={i}>
// //               <input
// //                 placeholder={`Option ${i + 1}`}
// //                 value={opt}
// //                 onChange={(e) => updateOption(e.target.value, i)}
// //               />
// //             </div>
// //           ))}

// //           {/* ADD OPTION */}
// //           <button className="btn add" onClick={addOption}>
// //             + Add Option
// //           </button>

// //           {/* CREATE */}
// //           <button className="btn create" onClick={create}>
// //             Create Poll 🚀
// //           </button>

// //         </div>

// //       </div>
// //     </>
// //   );
// // }

// import { useState } from "react";
// import { API } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function CreatePoll() {
//   const nav = useNavigate();

//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", ""]);

//   const addOption = () => {
//     setOptions([...options, ""]);
//   };

//   const updateOption = (value, index) => {
//     const updated = [...options];
//     updated[index] = value;
//     setOptions(updated);
//   };

//   const createPoll = async () => {
//     if (!question || options.some(opt => !opt)) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       await API.post("/polls", {
//         question,
//         options: options.map(opt => ({ text: opt }))
//       });

//       alert("Poll Created ✅");
//       nav("/home"); // 🔥 redirect
//     } catch (err) {
//       console.log(err);
//       alert("Error creating poll");
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div style={{ padding: "40px", color: "white" }}>
//         <h2>Create Poll</h2>

//         <input
//           placeholder="Enter question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         {options.map((opt, i) => (
//           <input
//             key={i}
//             placeholder={`Option ${i + 1}`}
//             value={opt}
//             onChange={(e) => updateOption(e.target.value, i)}
//           />
//         ))}

//         <button onClick={addOption}>+ Add Option</button>

//         <br /><br />

//         <button onClick={createPoll}>Create Poll</button>
//       </div>
//     </>
//   );
// }

// import { useState } from "react";
// import { API } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

// export default function CreatePoll() {
//   const nav = useNavigate();

//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("general");
//   const [options, setOptions] = useState(["", ""]);

//   const addOption = () => setOptions([...options, ""]);

//   const updateOption = (value, i) => {
//     const updated = [...options];
//     updated[i] = value;
//     setOptions(updated);
//   };

//   const createPoll = async () => {
//     if (!question || options.some(o => !o)) {
//       return alert("Fill all fields");
//     }

//     try {
//       await API.post("/polls", {
//         question,
//         type, // ✅ FIXED
//         options: options.map(o => ({ text: o }))
//       });

//       alert("Created ✅");
//       nav("/home");
//     } catch (err) {
//       alert("Error");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <h2>Create Poll</h2>

//       <input value={question} onChange={e => setQuestion(e.target.value)} />

//       <select value={type} onChange={e => setType(e.target.value)}>
//         <option value="general">General</option>
//         <option value="student">Student</option>
//         <option value="teacher">Teacher</option>
//       </select>

//       {options.map((o, i) => (
//         <input key={i} value={o} onChange={e => updateOption(e.target.value, i)} />
//       ))}

//       <button onClick={addOption}>+</button>
//       <button onClick={createPoll}>Create</button>
//     </>
//   );
// }

import { useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreatePoll() {
  const nav = useNavigate();

  const [question, setQuestion] = useState("");
  const [type, setType] = useState("general");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);

  const updateOption = (value, i) => {
    const updated = [...options];
    updated[i] = value;
    setOptions(updated);
  };

  const createPoll = async () => {
    if (!question || options.some(o => !o)) {
      return alert("Fill all fields");
    }

    try {
      await API.post("/polls", {
        question,
        type,
        options: options.map(o => ({ text: o }))
      });

      alert("Poll Created ✅");
      nav("/home");
    } catch (err) {
      console.log(err);
      alert("Error creating poll");
    }
  };

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
          width: 420px;
          background: #111827;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
        }

        .label {
          font-size: 13px;
          color: #9ca3af;
          margin: 10px 0 5px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #1f2937;
          color: white;
          margin-bottom: 10px;
        }

        input::placeholder {
          color: #6b7280;
        }

        .btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          margin-top: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .add {
          background: #22c55e;
        }

        .create {
          background: #3b82f6;
        }

        .back {
          background: #374151;
        }

        .btn:hover {
          opacity: 0.9;
        }

        .option-row {
          display: flex;
          gap: 8px;
        }

        .remove-btn {
          background: red;
          border: none;
          color: white;
          padding: 0 10px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <div className="title">Create Poll 📊</div>

          {/* QUESTION */}
          <div className="label">Question</div>
          <input
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* CATEGORY */}
          <div className="label">Category</div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="general">General</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {/* OPTIONS */}
          <div className="label">Options</div>

          {options.map((o, i) => (
            <div key={i} className="option-row">
              <input
                placeholder={`Option ${i + 1}`}
                value={o}
                onChange={(e) => updateOption(e.target.value, i)}
              />
              {options.length > 2 && (
                <button
                  className="remove-btn"
                  onClick={() =>
                    setOptions(options.filter((_, index) => index !== i))
                  }
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* ADD OPTION */}
          <button className="btn add" onClick={addOption}>
            + Add Option
          </button>

          {/* CREATE */}
          <button className="btn create" onClick={createPoll}>
            Create Poll 🚀
          </button>

          {/* BACK */}
          <button className="btn back" onClick={() => nav("/home")}>
            ← Back to Home
          </button>

        </div>
      </div>
    </>
  );
}