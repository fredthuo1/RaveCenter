const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Get all events
router.get('/events', async (req, res) => {
    const events = await Event.find();
    res.status(200).json({ message: "Events fetched successfully", events: events });
});

// Get an event by ID
router.get('/events/:id', async (req, res) => {
    const event = await Event.findOne({ eventId: req.params.id });
    if (event) {
        res.status(200).json({ message: "Event fetched successfully", event: event });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

// Create a new event
router.post('/events', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ message: "Event created successfully", event: event });
});

// Update an event by ID
router.put('/events/:id', async (req, res) => {
    const updatedEvent = await Event.findOneAndUpdate({ eventId: req.params.id }, req.body, { new: true });
    if (updatedEvent) {
        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

// Delete an event by ID
router.delete('/events/:id', async (req, res) => {
    const deletedEvent = await Event.findOneAndDelete({ eventId: req.params.id });
    if (deletedEvent) {
        res.status(200).json({ message: "Event deleted successfully" });
    } else {
        res.status(404).json({ message: "Event not found" });
    }
});

module.exports = router;
