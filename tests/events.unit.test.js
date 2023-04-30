const request = require('supertest');
const express = require('express');
const eventRoutes = require('../routes/api/eventsRouter');
const authRoutes = require('../routes/api/authRouter');
const authMiddleware = require('../controllers/authMiddleware');
const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Express app setup
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

describe('Event routes', () => {
    let authToken;
    let userId;

    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await User.deleteMany({});
        await Event.deleteMany({});

        // Register a user and authenticate
        const registeredUser = await User.create({
            email: 'test@example.com',
            password: 'Test1234$',
            firstName: 'John',
            lastName: 'Doe'
        });

        userId = registeredUser._id;

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'Test1234$'
            });

        authToken = res.body.token;
    });

    afterAll(async () => {
        // Clean up test database and close the connection
        await User.deleteMany({});
        await Event.deleteMany({});
        await mongoose.connection.close();
    });

    describe('GET /api/events', () => {
        it('should return all events', async () => {
            await Event.create({
                name: 'Test Event 1',
                description: 'This is a test event.',
                creator: userId
            });

            await Event.create({
                name: 'Test Event 2',
                description: 'This is another test event.',
                creator: userId
            });

            const res = await request(app)
                .get('/api/events')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Events fetched successfully');
            expect(res.body).toHaveProperty('events');
            expect(res.body.events.length).toEqual(2);
        });
    });

    describe('GET /api/events/:id', () => {
        it('should return an event by ID', async () => {
            const event = await Event.create({
                name: 'Test Event',
                description: 'This is a test event.',
                creator: userId
            });

            const res = await request(app)
                .get(`/api/events/${event._id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Event fetched successfully');
            expect(res.body).toHaveProperty('event');
            expect(res.body.event._id).toEqual(event._id.toString());
        });

        it('should return an error for an invalid event ID', async () => {

            const res = await request(app)
                .get('/api/events/invalid-id')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Error fetching event');
        });

        it('should return an error for a non-existent event ID', async () => {

            const res = await request(app)
                .get('/api/events/123456789012')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Event not found');
        });
    });

    describe('POST /api/events', () => {
        let authToken;
        let userId;
        let registeredEmail = 'test@example.com';
        let registeredPassword = 'Test1234$';

        beforeAll(async () => {
            // Register a user and log them in to obtain an auth token
            await request(app)
                .post('/api/auth/register')
                .send({
                    email: registeredEmail,
                    password: registeredPassword,
                    firstName: 'John',
                    lastName: 'Doe'
                });

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: registeredEmail,
                    password: registeredPassword
                });

            const user = res.body.user;
            authToken = res.body.token;
            userId = user.id;
        });

        afterAll(async () => {
            // Clean up the test database after each test
            await Event.deleteMany({});
        });

        describe('when user is authenticated', () => {
            it('should create a new event', async () => {
                const newEvent = {
                    name: 'Test Event',
                    description: 'This is a test event.',
                    start: '2023-05-01T00:00:00.000Z',
                    end: '2023-05-02T00:00:00.000Z'
                };

                const res = await request(app)
                    .post('/api/events')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(newEvent);

                expect(res.statusCode).toEqual(201);
                expect(res.body).toHaveProperty('message', 'Event created successfully');
                expect(res.body).toHaveProperty('event');
                expect(res.body.event).toHaveProperty('name', 'Test Event');
                expect(res.body.event).toHaveProperty('description', 'This is a test event.');
                expect(res.body.event).toHaveProperty('start', '2023-05-01T00:00:00.000Z');
                expect(res.body.event).toHaveProperty('end', '2023-05-02T00:00:00.000Z');
                expect(res.body.event).toHaveProperty('creator', userId);
            });
        });

        describe('when user is not authenticated', () => {
            it('should return an error', async () => {
                const newEvent = {
                    name: 'Test Event',
                    description: 'This is a test event.',
                    start: '2023-05-01T00:00:00.000Z',
                    end: '2023-05-02T00:00:00.000Z'
                };

                const res = await request(app)
                    .post('/api/events')
                    .send(newEvent);

                expect(res.statusCode).toEqual(401);
                expect(res.body).toHaveProperty('message', 'Unauthorized');
            });
        });
    });

});
