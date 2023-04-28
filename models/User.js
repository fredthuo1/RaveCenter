const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEventCoordinator: { type: Boolean, default: false },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
