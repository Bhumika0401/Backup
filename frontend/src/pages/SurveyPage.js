// pages/SurveyPage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api/api";

export default function SurveyPage() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    API.get(`/surveys/${id}`).then(res => setSurvey(res.data));
  }, [id]);

  if (!survey) return <p>Loading...</p>;

  return (
    <div>
      <h2>{survey.title}</h2>

      {survey.questions.map(q => (
        <div key={q._id}>
          <p>{q.text}</p>
          <p style={{color:"green"}}>Answer: {q.correctAnswer}</p>
        </div>
      ))}
    </div>
  );
}