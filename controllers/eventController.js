const Event = require('../models/Event');
const User = require('../models/User');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

const orgId = process.env.ORGANIZATION_ID;

const app = express();

app.use(bodyParser.json());

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
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({
            message: 'Event fetched successfully',
            event,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching event',
            error,
        });
    }
};

// Create a new event
const createEvent = async (req, res) => {
    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const userId = req.user.id; // assuming the authenticated user's ID is available in the request object
        const {
            name,
            description,
            url,
            start,
            end,
            created,
            changed,
            status,
            currency,
            online_event,
            hide_start_date,
            hide_end_date,
            venue_id,
            organizer_id,
            category_id,
            subcategory_id,
            format_id,
            timezone,
        } = req.body;

        const event = new Event({
            name,
            description,
            url,
            start,
            end,
            created,
            changed,
            status,
            currency,
            online_event,
            hide_start_date,
            hide_end_date,
            venue_id,
            organizer_id,
            category_id,
            subcategory_id,
            format_id,
            timezone,
            creator: userId, // set the creator field to the authenticated user's ID
            ratings: [], // initialize an empty ratings array
        });

        await event.save(); // save the new event to the database
        await User.findByIdAndUpdate(userId, { $push: { events: event._id } }); // add the new event's ID to the user's events array

        res.status(201).json({ message: "Event created successfully", event });
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err });
    }
};



// Update an event by ID
const updateEventById = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
        const event = await Event.findOne({ _id: id, creator: userId });

        if (!event) {
            return res.status(404).json({ message: 'Not authorized to update event!' });
        }

        const updatedEvent = await Event.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        return res.json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating event', error: err });
    }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
        const event = await Event.findOne({ _id: id, creator: userId });
       
        if (!event) {
            return res.status(404).json({ message: 'Not authorized to delete event!' });
        }

        await Event.findOneAndDelete({ _id: id });

        return res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting event', error: err });
    }
};

// Search for public events
const createEventOnEventBrite = async (req, res) => {
    console.log(req.body)
    const {
        name: { html },
        description: { html },
        start: { utc: startUtc, timezone: startTz },
        end: { utc: endUtc, timezone: endTz },
        currency,
        online_event,
        organizer_id,
        capacity,
        password,
        listed,
        shareable,
        invite_only,
        show_remaining,
        show_pick_a_seat,
        show_seatmap_thumbnail,
        show_colors_in_seatmap_thumbnail,
        locale,
    } = req.body.event;

    // Validate name and description fields
    if (typeof name.html !== 'string' || typeof description.html !== 'string') {
        return res.status(400).json({ message: 'Invalid input for name or description' });
    }

    const event = {
        event: {
            name: { html },
            description: { html },
            url,
            start: { utc: startUtc, timezone: startTz },
            end: { utc: endUtc, timezone: endTz },
            created,
            changed,
            status,
            currency,
            online_event,
            hide_start_date,
            hide_end_date,
            venue_id,
            organizer_id,
            category_id,
            subcategory_id,
            format_id,
            timezone,
            capacity,
            password,
            listed,
            shareable,
            invite_only,
            show_remaining,
            show_pick_a_seat,
            show_seatmap_thumbnail,
            show_colors_in_seatmap_thumbnail,
            locale,
            ratings: [], // initialize an empty ratings array
        },
    };

    // Send the request to the Eventbrite API
    try {
        const response = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`, event, {
            headers: {
                Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const createdEvent = response.data.event;
        res.status(200).json({ message: 'Event updated successfully', event: createdEvent });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Get Eventbrite event details by ID
const getEventbriteEvents = async (req, res) => {
    try {
        const response = await axios.get(`https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`, {
            headers: { Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}` },
            'Content-Type': 'application/json'
        });

        const eventData = response.data;

        // Convert circular references to string and then back to JSON
        const event = JSON.parse(JSON.stringify(eventData));

        res.status(200).json({ message: 'Event details fetched successfully', event });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching event details', error: error.message });
    }
};

// Search for public events
const updateEventOnEventBrite = async (req, res) => {
    const { name, description, start, end, currency, online_event, organizer_id, capacity, password } = req.body.event;

    // Validate name and description fields
    if (typeof name.html !== 'string' || typeof description.html !== 'string') {
        return res.status(400).json({ message: 'Invalid input for name or description' });
    }

    const event = {
        event: {
            name: { html: name.html },
            description: { html: description.html },
            start: { utc: start.utc, timezone: start.timezone },
            end: { utc: end.utc, timezone: end.timezone },
            currency,
            online_event,
            organizer_id,
            capacity,
            password,
        }
    };

    // Send the request to the Eventbrite API
    try {
        const response = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`, event, {
            headers: {
                Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        const createdEvent = response.data.event;
        res.status(200).json({ message: 'Event created successfully', event: createdEvent });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

// Search for public events
const deleteEventOnEventBrite = async (req, res) => {
    let eventId = req.params.id;
    console.log(eventId)

    // Send the request to the Eventbrite API
    try {
        const response = await axios.delete(`https://www.eventbriteapi.com/v3/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        res.status(200).json({ message: 'Event is deleted successfully'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

const getMyOrganizations = async (req, res) => {

    console.log("Here");
    try {
        const response = await (await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/', {
            headers: {
                'Authorization': `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }));

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ message: data.error_description });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
    createEventOnEventBrite,
    getEventbriteEvents,
    updateEventOnEventBrite,
    deleteEventOnEventBrite,
    getMyOrganizations,
};
