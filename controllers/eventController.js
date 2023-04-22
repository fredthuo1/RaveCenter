const Event = require('../models/Event');

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ message: 'Events fetched successfully', events });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err });
    }
};

// Get an event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.id });
        if (event) {
            res.status(200).json({ message: 'Event fetched successfully', event });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event', error: err });
    }
};

// Create a new event
const createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err });
    }
};

// Update an event by ID
const updateEventById = async (req, res) => {
    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { eventId: req.params.id },
            req.body,
            { new: true }
        );
        if (updatedEvent) {
            res
                .status(200)
                .json({ message: 'Event updated successfully', event: updatedEvent });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err });
    }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ eventId: req.params.id });
        if (deletedEvent) {
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
};
