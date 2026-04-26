// // pages/CreateSurvey.js
// import { useEffect, useState } from "react";
// import { API } from "../api/api";

// export default function CreateSurvey() {
//   const [questions, setQuestions] = useState([]);
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     API.get("/questions").then(res => setQuestions(res.data));
//   }, []);

//   const createSurvey = async () => {
//     await API.post("/surveys", { questions: selected });
//     alert("Survey Created");
//   };

//   return (
//     <div>
//       <h2>Select Questions</h2>

//       {questions.map(q => (
//         <div key={q._id}>
//           <input type="checkbox" onChange={()=>setSelected([...selected, q._id])} />
//           {q.text}
//         </div>
//       ))}

//       <button onClick={createSurvey}>Create Survey</button>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function CreateSurvey() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    API.get("/questions").then((res) => setQuestions(res.data));
  }, []);

  // toggle selection safely (fixes duplicate issue)
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };

  const createSurvey = async () => {
    try {
      await API.post("/surveys", { questions: selected });
      alert("Survey Created 🚀");
      setSelected([]);
    } catch (err) {
      console.error(err);
      alert("Error creating survey");
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

        .survey-create {
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

        .question-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }

        .question-card {
          width: 60%;
          padding: 15px 20px;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: 0.3s;
        }

        .question-card:hover {
          transform: scale(1.02);
          background: rgba(255,255,255,0.12);
        }

        .question-card.selected {
          border: 1px solid #22c55e;
          background: rgba(34,197,94,0.15);
        }

        .checkbox {
          width: 18px;
          height: 18px;
          accent-color: #22c55e;
        }

        .btn {
          margin-top: 30px;
          padding: 12px 18px;
          border: none;
          border-radius: 10px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .center {
          text-align: center;
        }

        @media (max-width: 768px) {
          .question-card {
            width: 90%;
          }
        }
      `}</style>

      {/* PAGE */}
      <div className="survey-create">

        <h2 className="title">Create Survey 🧠</h2>

        <div className="question-list">

          {questions.map((q) => {
            const isSelected = selected.includes(q._id);

            return (
              <div
                key={q._id}
                className={`question-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSelect(q._id)}
              >
                <span>{q.text}</span>

                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(q._id)}
                  className="checkbox"
                />
              </div>
            );
          })}

        </div>

        <div className="center">
          <button className="btn" onClick={createSurvey}>
            Create Survey 🚀
          </button>
        </div>

      </div>
    </>
  );
}
