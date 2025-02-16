const {
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
} = require('../models/userModel');

const {
    getUserBooks,
    addUserBooks,
    deleteBookById
} = require('../models/bookModel');

const getUsers = async (req, res) => {
    try {
        const [users] = await findAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: "Error getting users"});
    }
};

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const [user] = await findUserById(id);

        if (user.length === 0) return res.status(404).json({message: 'User does not exist'});

        return res.status(200).json(user[0]);
    } catch (err) {
        res.status(500).json({message: "Error getting user"});
    }
};

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, password} = req.body;

        await updateUserById(id, name, password);
        res.status(200).json({message: 'User updated successfully'});
    } catch (err) {
        res.status(500).json({message: "Error updating user"});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        await deleteUserById(id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({message: "Error deleting user"});
    }
};

const getBooksList = async (req, res) => {
    try {
        const {id} = req.params;

        const [booksList] = await getUserBooks(id);
        res.status(200).json(booksList);
    } catch (err) {
        res.status(500).json({message: "Error getting books list", errors: err.message});
    }
};

const addToBooksList = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(req.body);
        const {key, title, first_publish_year, author_name, cover_i} = req.body;

        await addUserBooks(id, key, title, author_name, cover_i, first_publish_year);
        res.status(200).json({message: 'Book added successfully'});
    } catch (err) {
        res.status(500).json({message: "Error adding book", error: err.message});
    }
};

const deleteBookFromList = async (req, res) => {
    try {
       const {id, key} = req.params;
       console.log(req.params);

       await deleteBookById(id, key);
       res.status(200).json({message: 'Book deleted successfully'});
    } catch (err) {
        res.status(500).json({message: "Error deleting book"});
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


