// routes/api.js
const express = require('express');
const eventRoutes = require('./api/eventRoutes');
const userRoutes = require('./api/userRoutes');

const router = express.Router();

router.use('/events', eventRoutes);
router.use('/users', userRoutes);

module.exports = router;
