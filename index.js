require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USER_ID = "john_doe_17091999"; // Change to your full_name_ddmmyyyy
const EMAIL = "john@xyz.com"; // Replace with your actual email
const ROLL_NUMBER = "ABCD123"; // Replace with your actual roll number

// POST Endpoint
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const numbers = data.filter((item) => !isNaN(item));
        const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet,
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

// GET Endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
