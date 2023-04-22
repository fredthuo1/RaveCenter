const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const eventRouter = require('./routes/events');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use routers
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Serve static assets (React build) in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(path.resolve(), 'client/build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
