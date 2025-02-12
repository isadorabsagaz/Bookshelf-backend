const express = require('express');
const { signup , login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//signup route
router.post("/signup", authMiddleware, signup);
router.post("/login", authMiddleware, login);

module.exports = router;