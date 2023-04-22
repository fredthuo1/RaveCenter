const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/userController");

// POST /api/user/login
router.post("/login", login);

// POST /api/user/register
router.post("/register", register);

module.exports = router;
