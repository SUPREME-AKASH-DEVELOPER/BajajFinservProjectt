// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use dynamic port for Render deployment
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper function to process data
const processData = (data) => {
    const numbers = data.filter(item => typeof item === 'number');
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    
    // Get the highest alphabet (case-insensitive comparison)
    const highestAlphabet = alphabets.length > 0 
        ? [alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0]]
        : [];

    return { numbers, alphabets, highestAlphabet };
};

// GET Route (Health Check)
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// POST Route (Main Logic)
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Validate input
    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: "Invalid input. 'data' should be a non-empty array." });
    }

    // Process data
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
    console.log(`✅ Backend running on: https://bajajfinservprojectt.onrender.com`);
});
