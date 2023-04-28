const User = require('../models/User');
const Event = require('../models/Event');

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password123',
        isEventCoordinator: true,
        events: [],
        ratings: []
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'password456',
        isEventCoordinator: false,
        events: [],
        ratings: []
    }
];

const events = [
    {
        name: 'Event 1',
        description: 'This is event 1',
        url: 'https://event1.com',
        start: new Date('2023-05-01T00:00:00.000Z'),
        end: new Date('2023-05-02T00:00:00.000Z'),
        created: new Date(),
        changed: new Date(),
        status: 'Published',
        currency: 'USD',
        online_event: false,
        hide_start_date: false,
        hide_end_date: false,
        venue_id: 'venue1',
        organizer_id: 'organizer1',
        category_id: 'category1',
        subcategory_id: 'subcategory1',
        format_id: 'format1',
        timezone: 'America/New_York',
        creator: null,
        ratings: []
    },
    {
        name: 'Event 2',
        description: 'This is event 2',
        url: 'https://event2.com',
        start: new Date('2023-06-01T00:00:00.000Z'),
        end: new Date('2023-06-02T00:00:00.000Z'),
        created: new Date(),
        changed: new Date(),
        status: 'Published',
        currency: 'USD',
        online_event: true,
        hide_start_date: true,
        hide_end_date: true,
        venue_id: 'venue2',
        organizer_id: 'organizer2',
        category_id: 'category2',
        subcategory_id: 'subcategory2',
        format_id: 'format2',
        timezone: 'America/Los_Angeles',
        creator: null,
        ratings: []
    }
];

module.exports = {
    users,
    events
};
