const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
    createEventOnEventBrite,
    getEventbriteEvents,
    updateEventOnEventBrite,
    getMyOrganizations,
    deleteEventOnEventBrite,
} = require('../../controllers/eventController');
const { verifyToken } = require('../../controllers/authMiddleware');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', verifyToken, createEvent);
router.put('/:id', verifyToken, updateEventById);
router.delete('/:id', verifyToken, deleteEventById);

// New routes for Eventbrite API methods
router.post('/eventbrite/events', createEventOnEventBrite);
router.get('/eventbrite/events', getEventbriteEvents);
router.put('/eventbrite/events/:id', updateEventOnEventBrite);
router.delete('/eventbrite/events/:id', deleteEventOnEventBrite);
router.get('/eventbrite/getMyOrganizations', getMyOrganizations);

module.exports = router;
