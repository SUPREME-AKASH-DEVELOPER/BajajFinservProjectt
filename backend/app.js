// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to process data
const processData = (data) => {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highestAlphabet = alphabets.filter(item => item === alphabets.sort().reverse()[0]);
    return { numbers, alphabets, highestAlphabet };
};

// GET Route
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// POST Route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const { numbers, alphabets, highestAlphabet } = processData(data);

    res.json({
        is_success: true,
        user_id: "22BET10018",
        email: "akashlakhwan2329@gmail.com",
        roll_number: "22BET10018",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
