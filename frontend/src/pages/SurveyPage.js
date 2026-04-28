import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Navbar from "../components/Navbar";

export default function SurveyPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      const res = await API.get(`/surveys/${id}`);
      setSurvey(res.data);
    } catch (err) {
      setSurvey(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ store answer properly
  const selectOption = (qIndex, optIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: optIndex,
    }));
  };

  // ✅ submit FIXED
  const submitSurvey = async () => {
    if (!survey) return;

    const formattedAnswers = Object.keys(answers).map((qIndex) => ({
      questionIndex: Number(qIndex),
      selectedOption: answers[qIndex],
    }));

    if (formattedAnswers.length !== survey.questions.length) {
      return alert("Answer all questions");
    }

    try {
      await API.post("/responses/survey", {
        surveyId: survey._id,
        answers: formattedAnswers,
      });

      alert("Survey submitted 🎉");
      nav("/surveys");
    } catch (err) {
      alert(err.response?.data?.msg || "Submit failed");
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  if (!survey) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: 50 }}>
        Survey not found ❌
        <br />
        <button onClick={() => nav("/surveys")}>Back</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ minHeight: "100vh", background: "#0b1220", color: "white", padding: 30 }}>
        <h2>{survey.title}</h2>

        {survey.questions.map((q, i) => (
          <div key={i} style={{ background: "#1f2937", padding: 15, marginTop: 15, borderRadius: 10 }}>
            <h4>{q.questionText}</h4>

            {q.options.map((opt, j) => (
              <div
                key={j}
                onClick={() => selectOption(i, j)}
                style={{
                  padding: 8,
                  marginTop: 6,
                  background: answers[i] === j ? "#22c55e" : "#374151",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                {opt.text}
              </div>
            ))}
          </div>
        ))}

        <button
          onClick={submitSurvey}
          style={{
            marginTop: 20,
            padding: 12,
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Submit Survey 🚀
        </button>
      </div>
    </>
  );
}