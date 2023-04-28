const Rating = require("../modules/Rating");

// Get all ratings
const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get rating by Id
const getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.status(200).json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create rating
const createRating = async (req, res) => {
    const { userId, eventId, rating, createdAt } = req.body;

    // Server-side validation
    if (!userId) {
        return res.status(400).json({ message: 'Please sign In to rate this event!' });
    } else if (!eventId) {
        return res.status(400).json({ message: 'Please select an Event to rate!' });
    } else if (!rating) {
        return res.status(400).json({ message: 'Please give a rating to submit!' });
    } else if (!createdAt) {
        return res.status(400).json({ message: 'Please give the time the rating was given!' });
    }

    try {
        // Check if rating by User already exists
        const existingRatingByUser = await Rating.findOne({ userId, eventId });

        if (existingRatingByUser) {
            updateRating(req, res);
        } else {
            const newRating = new Rating({ userId, eventId, rating, createdAt });
            await newRating.save();

            await Event.findByIdAndUpdate( eventId, { $push: { ratings: newRating } });

            await User.findByIdAndUpdate( userId, { $push: { ratings: newRating } });
        }

        res.status(201).json({ message: "Rationg created successfully", rating: newRating }); 
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

// Update Rating
const updateRating = async (req, res) => {
    try {
        const updatedRating = await Rating.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.status(200).json(updatedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteRating = async (req, res) => {
    try {
        const deletedRating = await User.findByIdAndDelete(req.params.id);
        if (!deletedRating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllRatings,
    getRatingById,
    createRating,
    updateRating,
    deleteRating
};