// // pages/SurveyPage.js
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API } from "../api/api";

// export default function SurveyPage() {
//   const { id } = useParams();
//   const [survey, setSurvey] = useState(null);

//   useEffect(() => {
//     API.get(`/surveys/${id}`).then(res => setSurvey(res.data));
//   }, [id]);

//   if (!survey) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{survey.title}</h2>

//       {survey.questions.map(q => (
//         <div key={q._id}>
//           <p>{q.text}</p>
//           <p style={{color:"green"}}>Answer: {q.correctAnswer}</p>
//         </div>
//       ))}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api/api";

export default function SurveyPage() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    API.get(`/surveys/${id}`).then((res) => setSurvey(res.data));
  }, [id]);

  if (!survey) {
    return (
      <div style={styles.loading}>
        Loading survey...
      </div>
    );
  }

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

        .survey-page {
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

        .survey-title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 30px;
        }

        .questions-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        .question-card {
          width: 60%;
          padding: 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          transition: 0.3s;
        }

        .question-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.12);
        }

        .question-text {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .answer {
          color: #22c55e;
          font-weight: bold;
        }

        .loading {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: white;
          background: #0f172a;
        }

        @media (max-width: 768px) {
          .question-card {
            width: 90%;
          }
        }
      `}</style>

      {/* PAGE */}
      <div className="survey-page">

        <h2 className="survey-title">{survey.title} 📝</h2>

        <div className="questions-container">

          {survey.questions.map((q) => (
            <div className="question-card" key={q._id}>
              <div className="question-text">{q.text}</div>
              <div className="answer">
                Answer: {q.correctAnswer}
              </div>
            </div>
          ))}

        </div>

      </div>
    </>
  );
}

/* Loading style */
const styles = {
  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: "white",
    background: "#0f172a",
  },
};
