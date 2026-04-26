// // pages/CreatePoll.js
// import { useState } from "react";
// import { API } from "../api/api";

// export default function CreatePoll() {
//   const [question, setQuestion] = useState("");
//   const [type, setType] = useState("student"); // ✅ added
//   const [options, setOptions] = useState(["", ""]);

//   const create = async () => {
//     try {
//       const formattedOptions = options.map(o => ({
//         text: o,
//         votes: 0
//       }));

//       await API.post("/polls", {
//         question,
//         type, // ✅ send type
//         options: formattedOptions
//       });

//       alert("Poll Created");
//     } catch (err) {
//       console.error(err);
//       alert("Error creating poll");
//     }
//   };

//   return (
//     <div>
//       <h2>Create Poll</h2>

//       <input
//         placeholder="Question"
//         onChange={e => setQuestion(e.target.value)}
//       />

//       {/* ✅ Type Dropdown */}
//       <select onChange={(e) => setType(e.target.value)}>
//         <option value="student">Student</option>
//         <option value="teacher">Teacher</option>
//         <option value="general">General</option>
//       </select>

//       {/* Options */}
//       {options.map((o, i) => (
//         <input
//           key={i}
//           placeholder={`Option ${i + 1}`}
//           onChange={(e) => {
//             let arr = [...options];
//             arr[i] = e.target.value;
//             setOptions(arr);
//           }}
//         />
//       ))}

//       <button onClick={() => setOptions([...options, ""])}>
//         Add Option
//       </button>

//       <button onClick={create}>Create</button>
//     </div>
//   );
// }



import { useState } from "react";
import { API } from "../api/api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("student");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const create = async () => {
    try {
      const formattedOptions = options
        .filter((o) => o.trim() !== "")
        .map((o) => ({ text: o, votes: 0 }));

      await API.post("/polls", {
        question,
        type,
        options: formattedOptions,
      });

      alert("Poll Created 🚀");

      setQuestion("");
      setType("student");
      setOptions(["", ""]);
    } catch (err) {
      console.error(err);
      alert("Error creating poll");
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

        .poll-page {
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

        .title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 30px;
        }

        .form {
          width: 60%;
          margin: auto;
          padding: 25px;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        input, select {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.1);
          color: white;
        }

        input::placeholder {
          color: #cbd5e1;
        }

        select option {
          color: black;
        }

        .option-box {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .btn {
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

        .btn:hover {
          background: #2563eb;
          transform: scale(1.03);
        }

        .add-btn {
          background: #22c55e;
        }

        .add-btn:hover {
          background: #16a34a;
        }

        @media (max-width: 768px) {
          .form {
            width: 90%;
          }
        }
      `}</style>

      {/* PAGE */}
      <div className="poll-page">

        <h2 className="title">Create Poll 📊</h2>

        <div className="form">

          {/* Question */}
          <input
            placeholder="Enter your poll question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          {/* Type */}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="general">General</option>
          </select>

          {/* Options */}
          {options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => updateOption(e.target.value, i)}
            />
          ))}

          <button className="btn add-btn" onClick={addOption}>
            + Add Option
          </button>

          <button className="btn" onClick={create}>
            Create Poll 🚀
          </button>

        </div>

      </div>
    </>
  );
}
