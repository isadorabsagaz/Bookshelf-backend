const User = require('../models/userModel');
const {createUser} = require("../models/userModel");

//signup auth controller
const signup = async (req, res) => {
    try {
     const { username, email, password } = req.body;
     if (!username || !email || !password) return res.status(400).json({message: 'All fields are required'});


     const existingUser = await User.findUserByEmail(email);
     if (existingUser) return res.status(400).json({message: 'User already exists'});

     await createUser(username, email, password);
     res.status(201).json({message: 'User created successfully'});
    } catch (err) {
        res.status(500).json({message: 'Error creating user'});
    }
}

module.exports = { signup };