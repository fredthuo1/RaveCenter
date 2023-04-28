const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const mongoose = require('mongoose');
const request = require('supertest');

const app = express();

require('dotenv').config();

const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById
} = require('../controllers/eventController');

// Set up middleware and routes for the Express app
app.use(express.json());
app.post('/events', createEvent);

describe('Event Controller', () => {
    let savedEventId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.log('Error connecting to MongoDB:', err));
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Event.deleteMany({});
        await User.deleteMany({});

        const user = new User({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: 'Testpassword123!'
        });
        const savedUser = await user.save();

        const newEvent = new Event({
            name: 'Test Event',
            description: 'This is a test event',
            creator: savedUser._id,
            id: 'savedEventId'
        });
        const savedEvent = await newEvent.save();
        savedEventId = savedEvent._id;
    });


    describe('getAllEvents', () => {
        it('should return all events', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllEvents(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Events fetched successfully',
                    events: expect.any(Array),
                })
            );
        });

        it('should return an error when events cannot be fetched', async () => {
            Event.find = jest.fn().mockRejectedValue(new Error('Database error'));
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllEvents(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Error fetching events',
                    error: expect.any(Error),
                })
            );
        });
    }, 30000);

    describe('getEventById', () => {
        it('should return the specified event', async () => {

            const req = {
                params: {
                    id: savedEventId,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Event fetched successfully',
                    event: expect.any(Object),
                })
            );
        });

        it('should return a not found message for an invalid event ID', async () => {
            const req = {
                params: {
                    id: '644b5b154492d025027fa3ef',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Event not found',
                })
            );
        });

        it('should return an error when event cannot be fetched', async () => {
            Event.findOne = jest.fn().mockRejectedValue(new Error('Database error'));
            const req = {
                params: {
                    id: savedEventId,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Error fetching event',
                    error: expect.any(Error),
                })
            );
        });
    }, 30000);

    describe('createEvent', () => {
        let savedUser;
        let req;
        let res;

        beforeEach(async () => {
            await Event.deleteMany({});
            await User.deleteMany({});

            savedUser = new User({
                firstName: 'Test23',
                lastName: 'User32',
                email: 'test2233@example.com',
                password: 'Testpassword123!',
            });
            savedUser = await savedUser.save();

            req = {
                user: {
                    id: savedUser._id,
                },
                body: {
                    name: 'Test Event',
                    description: 'This is a test event',
                    creator: savedUser,
                },
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        });

        afterEach(async () => {
            await Event.deleteMany({});
            await User.deleteMany({});
        });

        it('should create a new event and add it to the user\'s events array', async () => {
            await createEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(201);

            const createdEvent = await Event.findOne({ name: req.body.name });
            expect(createdEvent).not.toBeNull();
            expect(savedUser.events).toContainEqual(createdEvent._id);
        });

        it('should return a 500 error if there is an error creating the event', async () => {
            // Remove required field from event creation request to cause error
            req.body.name = undefined;

            await createEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error creating event',
                error: expect.anything(),
            });
        });

        it('should return a 401 error if the user is not authenticated', async () => {
            // Remove user ID from request to simulate unauthenticated user
            delete req.user.id;

            await createEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Unauthorized',
            });
        });
    });

    // Test the updateEventById function
    describe('updateEventById', () => {
        it('should update the specified event', async () => {
            const req = {
                params: {
                    id: savedEventId,
                },
                body: {
                    name: 'Updated Event',
                    description: 'This is an updated test event',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await updateEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Event updated successfully',
                    event: expect.objectContaining({
                        name: 'Updated Event',
                        description: 'This is an updated test event',
                    }),
                })
            );
        });

        it('should return a not found message for an invalid event ID', async () => {
            const req = {
                params: {
                    id: 'invalid-id',
                },
                body: {
                    name: 'Updated Event',
                    description: 'This is an updated test event',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await updateEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Event not found',
                })
            );
        });

        it('should return an error when event cannot be updated', async () => {
            Event.findOneAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));
            const req = {
                params: {
                    id: savedEventId,
                },
                body: {
                    name: 'Updated Event',
                    description: 'This is an updated test event',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await updateEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Error updating event',
                    error: expect.any(Error),
                })
            );
        });
    }, 30000);

    // Test the deleteEventById function
    describe('deleteEventById', () => {
        it('should delete the specified event', async () => {
            const req = {
                params: {
                    id: savedEventId,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await deleteEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Event deleted successfully',
                })
            );
        });

        it('should return a not found message for an invalid event ID', async () => {
            const req = {
                params: {
                    id: 'invalid-id',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await deleteEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Event not found',
                })
            );
        });

        it('should return an error when event cannot be deleted', async () => {
            Event.findOneAndDelete = jest.fn().mockRejectedValue(new Error('Database error'));
            const req = {
                params: {
                    id: savedEventId,
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await deleteEventById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'Error deleting event',
                    error: expect.any(Error),
                })
            );
        });
    });

}, 30000);
