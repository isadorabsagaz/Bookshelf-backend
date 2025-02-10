const express = require('express');
const pool = require("../config/database")

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({message: `Error: ${err}`});
    }
});

module.exports = router;
