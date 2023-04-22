const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const usersController = require("../controllers/usersController");

// Email regex
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

// Register a new user
const register = async (req, res) => {

    // Call the createUser method to handle the rest of the validation and user creation
    const newUser = await usersController.createUser({ firstName, lastName, email, password });

    res.status(201).json({ message: "User registered successfully", user: newUser });
};

// Login a user
const login = async (req, res) => {
    // Your login logic here
    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Server-side validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Logged in successfully", token, user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = {
    register,
    login
};
