const {
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
} = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const [users] = await findAllUsers();
        res.json(users);
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

module.exports = { getUsers, getUserById , updateUser, deleteUser };


