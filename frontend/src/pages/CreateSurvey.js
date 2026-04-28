import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Navbar from "../components/Navbar";

export default function CreateSurvey() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");

  const nav = useNavigate();

  useEffect(() => {
    API.get("/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((q) => q !== id)
        : [...prev, id]
    );
  };

  const createSurvey = async () => {
    try {
      if (!title) return alert("Enter title");
      if (selected.length === 0) return alert("Select questions");

      const selectedQuestions = questions
        .filter((q) => selected.includes(q._id))
        .map((q) => ({
          questionText: q.questionText,
          options:
            q.options?.length > 0
              ? q.options.map((opt) => ({ text: opt.text }))
              : [{ text: "Yes" }, { text: "No" }]
        }));

      await API.post("/surveys", {
        title,
        category,
        questions: selectedQuestions
      });

      alert("Survey Created 🚀");
      nav("/home");
    } catch (err) {
      console.log(err);
      alert("Error creating survey");
    }
  };

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <>
      <Navbar />

      <style>{`
        .page {
          min-height: 100vh;
          padding: 30px;
          background: radial-gradient(circle at top,#1e3a8a,#0b1220 60%);
          color: white;
          display: flex;
          justify-content: center;
        }

        .card {
          width: 520px;
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
          margin-top: 10px;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #1f2937;
          color: white;
        }

        .question {
          padding: 12px;
          margin-top: 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
          background: #1f2937;
        }

        .question:hover {
          transform: scale(1.02);
        }

        .selected {
          background: #22c55e !important;
          color: black;
          font-weight: 600;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          margin-top: 12px;
          cursor: pointer;
          font-weight: 600;
        }

        .load {
          background: #374151;
          color: white;
        }

        .create {
          background: #3b82f6;
          color: white;
        }

        .back {
          background: #6b7280;
          color: white;
        }

        .btn:hover {
          opacity: 0.9;
        }
      `}</style>

      <div className="page">
        <div className="card">

          <div className="title">Create Survey 🧠</div>

          {/* TITLE */}
          <div className="label">Survey Title</div>
          <input
            placeholder="Enter survey title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* CATEGORY */}
          <div className="label">Category</div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {/* QUESTIONS */}
          <div className="label">Select Questions</div>

          {questions.slice(0, visibleCount).map((q) => (
            <div
              key={q._id}
              className={`question ${
                selected.includes(q._id) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(q._id)}
            >
              {q.questionText}
            </div>
          ))}

          {/* LOAD MORE */}
          {visibleCount < questions.length && (
            <button className="btn load" onClick={loadMore}>
              Load More ⬇
            </button>
          )}

          {/* CREATE */}
          <button className="btn create" onClick={createSurvey}>
            Create Survey 🚀
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