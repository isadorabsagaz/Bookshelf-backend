const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUsers , getUserById ,  updateUser , deleteUser } = require('../controllers/userController');

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
