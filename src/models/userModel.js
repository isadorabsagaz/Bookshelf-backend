const db = require("../config/database");
const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const createUser = async (username, email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, hashPassword) VALUES (?,?,?)";
    await db.execute(query, [username, email, hashPassword]);
};

const findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

module.exports = { createUser, findUserByEmail };