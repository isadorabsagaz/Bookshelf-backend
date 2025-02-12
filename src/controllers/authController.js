const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require('../models/userModel');
const {createUser} = require("../models/userModel");

//signup auth controller
const signup = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password) return res.status(400).json({message: 'All fields are required'});

        const existingUser = await User.findUserByEmail(email);
        if (existingUser.length > 0) return res.status(400).json({message: 'User already exists'});

        await createUser(name, email, password);
        res.status(201).json({message: 'User created successfully'});

    } catch (err) {
        res.status(500).json({message: 'Error creating user'});
    }
}

//login auth controller
const login = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);

    try {
        const existingUser = await User.findUserByEmail(email);
        if (existingUser.length === 0) return res.status(400).json({message: 'User not found'});

        const user = existingUser[0];
        console.log(user.password);

        const match = await User.isPasswordMatch(password, user.password);
        if (!match) return res.status(400).json({message: 'Invalid password'});

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({message: 'User logged in successfully!', token: token});

    } catch (err) {
        res.status(500).json({message: 'Error on server', error: err.message});
    }
}

module.exports = { signup, login };