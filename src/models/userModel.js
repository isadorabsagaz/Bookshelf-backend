const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const createUser = async (name, email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
    await pool.execute(query, [name, email, hashPassword]);
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    const [rows] = await pool.query(query, [email]);
    return rows;
};

const isPasswordMatch = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = { createUser, findUserByEmail, isPasswordMatch };

