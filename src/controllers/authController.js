const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Signup
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashPassword });

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", err: err.message });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({ message: "User logged in successfully!", token });
    } catch (err) {
        res.status(500).json({ message: "Error on server", error: err.message });
    }
};

module.exports = {
    signup,
    login,
};
