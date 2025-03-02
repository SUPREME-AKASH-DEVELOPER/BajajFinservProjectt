// frontend/src/components/DataForm.js
import React, { useState } from "react";
import axios from "axios";

const DataForm = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = input.split(",").map(item => item.trim());

    try {
      const response = await axios.post("https://bajajfinservprojectt.onrender.com/bfhl", { data });
      setResult(response.data);
      setError("");
    } catch (err) {
      setError("Error occurred while processing data.");
      setResult(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>BFHL Data Processor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter values (e.g., A, 1, B, 2)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <h3>Result:</h3>
          <p><strong>Numbers:</strong> {JSON.stringify(result.numbers)}</p>
          <p><strong>Alphabets:</strong> {JSON.stringify(result.alphabets)}</p>
          <p><strong>Highest Alphabet:</strong> {JSON.stringify(result.highest_alphabet)}</p>
          <p><strong>User ID:</strong> {result.user_id}</p>
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Roll Number:</strong> {result.roll_number}</p>
        </div>
      )}
    </div>
  );
};

export default DataForm;
