const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    rating: { type: Double },
    createdAt: { type: Date },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
