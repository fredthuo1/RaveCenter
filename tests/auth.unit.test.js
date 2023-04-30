const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/api/authRouter');
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Create login mock function
const loginMock = jest.fn();

// Express app setup
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Email regex
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

describe('Auth routes', () => {

    afterEach(async () => {
        // Clean up the test database after each test
        await User.deleteMany({});
    });

    beforeAll(async () => {
        // Connect to a test database
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.log('Error connecting to MongoDB:', err));
    });

    afterAll(async () => {
        // Clean up test database and close the connection
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    describe('POST /api/auth/register', () => {
        let registeredEmail;
        let registeredPassword;

        it('should register a new user', async () => {
            registeredEmail = 'test34@example.com';
            registeredPassword = 'Test41234$';

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: registeredEmail,
                    password: registeredPassword,
                    firstName: 'John',
                    lastName: 'Doe'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message', 'User created successfully');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('email', registeredEmail);
            expect(res.body.user).toHaveProperty('firstName', 'John');
            expect(res.body.user).toHaveProperty('lastName', 'Doe');
        });

        it('should return an error if the user already exists', async () => {
            registeredEmail = 'test@example.com';
            registeredPassword = 'Test1234$';

            await User.create({
                email: registeredEmail,
                password: registeredPassword,
                firstName: 'Jane',
                lastName: 'Doe'
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: registeredEmail,
                    password: registeredPassword,
                    firstName: 'John',
                    lastName: 'Doe'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'User with this email already exists.');
        });

        it('should return an error if the email is invalid', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'testexeample.com',
                    password: 'Test1234$',
                    firstName: 'John',
                    lastName: 'Doe'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Invalid email format.');
        });

        it('should return an error if passwod is less than 8 characters', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Te123$',
                    firstName: 'John',
                    lastName: 'Doe'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Password must be at least 8 characters.');
        });

        it('should return an error if password does not include include uppercase letters, lowercase letters, digits, and special characters.', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'test1234$',
                    firstName: 'John',
                    lastName: 'Doe'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Password must include uppercase letters, lowercase letters, digits, and special characters.');
        });
    });

    describe('POST /api/auth/login', () => {
        let registeredEmail;
        let registeredPassword;

        beforeEach(async () => {
            // Register a user before testing login functionality
            registeredEmail = 'test@example.com';
            registeredPassword = 'Test1234$';

            await request(app)
                .post('/api/auth/register')
                .send({
                    email: registeredEmail,
                    password: registeredPassword,
                    firstName: 'John',
                    lastName: 'Doe'
                });
        });

        // Test case 1: Valid login
        it('should log in a user with correct email and password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: registeredEmail,
                    password: registeredPassword
                });
            console.log(res)
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Logged in successfully');
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('email', 'test@example.com');
        });

        // Test case 2: Invalid email format
        it('should return an error for invalid email format', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testexample.com',
                    password: 'Test1234$'
                });

            expect(res.status).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Invalid email format.');
        });

        // Test case 3: Missing email or password
        it('should return an error for missing email or password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                });

            expect(res.status).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Please fill out all fields.');
        });

        // Test case 4: Non-existing user
        it('should return an error for non-existing user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com', 
                    password: 'Test1234$'
                });

            expect(res.status).toEqual(400);
            expect(res.body).toHaveProperty('message', 'User not found');
        });

        // Test case 5: Incorrect password
        it('should return an error for incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'Testdf1234$'
                });

            expect(res.status).toEqual(400);
            expect(res.body).toHaveProperty('message', 'Invalid password');
        });
    });
});
