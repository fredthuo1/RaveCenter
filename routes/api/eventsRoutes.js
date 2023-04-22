const express = require('express');
const router = express.Router();
const eventController = require('../../controllers/eventController');

// GET /api/events
router.get('/', eventController.getAllEvents);

// GET /api/events/:id
router.get('/:id', eventController.getEventById);

// POST /api/events
router.post('/', eventController.createEvent);

// PUT /api/events/:id
router.put('/:id', eventController.updateEventById);

// DELETE /api/events/:id
router.delete('/:id', eventController.deleteEventById);

module.exports = router;
