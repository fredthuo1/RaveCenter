const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String },
    start: { type: String },
    end: { type: String },
    created: { type: String },
    changed: { type: String },
    status: { type: String },
    currency: { type: String },
    online_event: { type: Boolean },
    hide_start_date: { type: Boolean },
    hide_end_date: { type: Boolean },
    venue_id: { type: String },
    organizer_id: { type: String },
    category_id: { type: String },
    subcategory_id: { type: String },
    format_id: { type: String },
    timezone: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


