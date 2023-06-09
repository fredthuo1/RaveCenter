const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Email regex
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Server-side validation
    let errorMessage = '';
    if (!firstName || !lastName || !email || !password) {
        errorMessage = 'Please fill out all fields.';
    } else if (!emailRegex.test(email)) {
        errorMessage = 'Invalid email format.';
    } else if (password.length < 8) {
        errorMessage = 'Password must be at least 8 characters.';
    } else {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
            errorMessage = 'Password must include uppercase letters, lowercase letters, digits, and special characters.';
        }
    }

    if (errorMessage) {
        return res.status(400).json({ message: errorMessage });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save it
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json');
        }

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};



// Update a user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
