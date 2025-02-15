const pool = require("../config/database");

const addUserBooks = async (userId, bookId, title, year, author, cover_url) => {
    const query = 'INSERT INTO bookshelf (user_id, book_id, title, first_publish_year, author, cover_url) VALUES (?,?,?,?,?,?)';
    await pool.query(query, [userId, bookId, title, year, author, cover_url]);
};

const getUserBooks = async (id) => {
    const query = 'SELECT book_id, title, author, cover_url, first_publish_year FROM bookshelf WHERE user_id = ?';
    const [rows] = await pool.query(query, [id]);
    return rows;
};

const deleteBookById = async (id, bookId) => {
    const query = 'DELETE FROM bookshelf WHERE user_id = ? AND book_id = ?';
    await pool.query(query, [id, bookId]);
};

module.exports = {
    addUserBooks,
    getUserBooks,
    deleteBookById
}