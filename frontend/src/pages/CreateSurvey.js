// pages/CreateSurvey.js
import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function CreateSurvey() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    API.get("/questions").then(res => setQuestions(res.data));
  }, []);

  const createSurvey = async () => {
    await API.post("/surveys", { questions: selected });
    alert("Survey Created");
  };

  return (
    <div>
      <h2>Select Questions</h2>

      {questions.map(q => (
        <div key={q._id}>
          <input type="checkbox" onChange={()=>setSelected([...selected, q._id])} />
          {q.text}
        </div>
      ))}

      <button onClick={createSurvey}>Create Survey</button>
    </div>
  );
}