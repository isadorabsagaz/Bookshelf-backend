const bcrypt = require("bcryptjs");
const pool = require("../config/database");

const createUser = async (name, email, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    await pool.execute(query, [name, email, hashPassword]);
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?'
    const [rows] = await pool.query(query, [email]);
    return rows;
};

const isPasswordMatch = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const findAllUsers = async () => {
    const query = 'SELECT id, name, email FROM users';
    const [rows] = await pool.query(query);
    return [rows];
};

const findUserById = async (id) => {
    const query = 'SELECT id, name, email FROM users WHERE id = ?';
    const [rows] = await pool.query(query, [id]);
    return [rows];
};

const updateUserById = async (id, name, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE users SET name = ?, password = ? WHERE id = ?';
    await pool.query(query, [name, hashPassword, id]);
};

const deleteUserById = async (id) => {
    const query = 'DELETE FROM users WHERE id = ?';
    await pool.query(query, [id]);
};

module.exports = {
    createUser,
    findUserByEmail,
    isPasswordMatch,
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById,
};
