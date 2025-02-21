const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// GET Request - Returns operation_code
app.get("/bfhl", (req, res) => {
  return res.status(200).json({ operation_code: 1 });
});

// POST Request - Processes input and returns structured output
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const numbers = [];
    const alphabets = [];

    data.forEach(item => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (/^[A-Za-z]$/.test(item)) {
        alphabets.push(item);
      }
    });

    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort()[alphabets.length - 1]] : [];

    return res.status(200).json({
      is_success: true,
      user_id: "akash_22052002",
      email: "akash@example.com",
      roll_number: "22BET10018",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet
    });
  } catch (error) {
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
