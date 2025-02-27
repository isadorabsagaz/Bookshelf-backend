const pool = require("../config/database");

const getUserBooks = async (id) => {
    const query = 'SELECT `key`, title, author_name, cover_i, first_publish_year FROM bookshelf WHERE user_id = ?';
    const [rows] = await pool.query(query, [id]);
    return [rows];
};

const addUserBooks = async (userId, key, title, author_name, cover_i, first_publish_year) => {
    const query = 'INSERT INTO bookshelf (user_id, `key`, title, author_name, cover_i, first_publish_year) VALUES (?,?,?,?,?,?)';
    await pool.query(query, [userId, key, title, author_name, cover_i, first_publish_year]);
};

const deleteBookById = async (id, key) => {
    const query = 'DELETE FROM bookshelf WHERE user_id = ? AND `key` = ?';
    await pool.query(query, [id, key]);
};

module.exports = {
    getUserBooks,
    addUserBooks,
    deleteBookById
}