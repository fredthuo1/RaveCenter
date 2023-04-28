const express = require('express');
const router = express.Router();
const { getAllRatings, getRatingById, createRating, updateRating, deleteRating } = require('../../controllers/ratingsController.js');

router.get('/', getAllRatings);
router.get('/:id', getRatingById);
router.post('/', createRating);
router.put('/:id', updateRating);
router.delete('/:id', deleteRating);

module.exports = router;
