// pages/CreatePoll.js
import { useState } from "react";
import { API } from "../api/api";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("student"); // ✅ added
  const [options, setOptions] = useState(["", ""]);

  const create = async () => {
    try {
      const formattedOptions = options.map(o => ({
        text: o,
        votes: 0
      }));

      await API.post("/polls", {
        question,
        type, // ✅ send type
        options: formattedOptions
      });

      alert("Poll Created");
    } catch (err) {
      console.error(err);
      alert("Error creating poll");
    }
  };

  return (
    <div>
      <h2>Create Poll</h2>

      <input
        placeholder="Question"
        onChange={e => setQuestion(e.target.value)}
      />

      {/* ✅ Type Dropdown */}
      <select onChange={(e) => setType(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="general">General</option>
      </select>

      {/* Options */}
      {options.map((o, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          onChange={(e) => {
            let arr = [...options];
            arr[i] = e.target.value;
            setOptions(arr);
          }}
        />
      ))}

      <button onClick={() => setOptions([...options, ""])}>
        Add Option
      </button>

      <button onClick={create}>Create</button>
    </div>
  );
}