import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Added PropTypes for validation

const InputForm = ({ setResponse }) => {
  const [jsonInput, setJsonInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput); // Parse JSON safely
      const res = await axios.post(
        "https://your-backend-url.onrender.com/bfhl",
        parsedInput
      );
      setResponse(res.data);
    } catch {
      alert("Invalid JSON format! Please check your input.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON e.g. {"data": ["A", "B", "1", "2"]}'
      />
      <button type="submit">Submit</button>
    </form>
  );
};

// ✅ Added PropTypes for setResponse validation
InputForm.propTypes = {
  setResponse: PropTypes.func.isRequired,
};

export default InputForm;
