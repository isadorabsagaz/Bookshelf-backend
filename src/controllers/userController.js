const User = require("../models/userModel");   // Model Sequelize
const Bookshelf = require("../models/bookModel");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email"],
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error getting users", error: err.message });
    }
};

// Get user by id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ["id", "name", "email"],
        });
        if (!user) return res.status(404).json({ message: "User does not exist" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error getting user", error: err.message });
    }
};

// Update user by id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;

        const updateData = { name };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const [updated] = await User.update(updateData, { where: { id } });

        if (updated === 0)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

// Delete user by id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await User.destroy({ where: { id } });

        if (deleted === 0)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};

// Get books list for user
const getBooksList = async (req, res) => {
    try {
        const { id } = req.params;

        const booksList = await Bookshelf.findAll({
            where: { user_id: id },
            attributes: ['key', 'title', 'author_name', 'cover_i', 'first_publish_year']
        });

        res.status(200).json(booksList);
    } catch (err) {
        res.status(500).json({ message: "Error getting books list", error: err.message });
    }
};

// Add book to user's list
const addToBooksList = async (req, res) => {
    try {
        const { id } = req.params;
        let { key, title, first_publish_year, author_name, cover_i } = req.body;

        if (Array.isArray(author_name)) {
            author_name = author_name.join(", ");
        }

        await Bookshelf.create({
            user_id: id,
            key,
            title,
            author_name,
            cover_i,
            first_publish_year,
        });

        res.status(200).json({ message: "Book added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding book", error: err.message });
    }
};

// Delete book from user's list
const deleteBookFromList = async (req, res) => {
    try {
        const { id, key } = req.params;

        const deleted = await Bookshelf.destroy({ where: { user_id: id, key } });

        if (deleted === 0)
            return res.status(404).json({ message: "Book not found" });

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting book", error: err.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    addToBooksList,
    getBooksList,
    deleteBookFromList
};


