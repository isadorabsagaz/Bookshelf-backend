const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    addToBooksList,
    getBooksList,
    deleteBookFromList
} = require('../controllers/userController');

const {generatePDF} = require("../controllers/PDFgeneratorController");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

router.get("/:id/books", authMiddleware, getBooksList);
router.post("/:id/books", authMiddleware, addToBooksList);
router.delete("/:id/books/:key", authMiddleware, deleteBookFromList);

router.get("/:id/books/pdf", authMiddleware, generatePDF)

module.exports = router;
