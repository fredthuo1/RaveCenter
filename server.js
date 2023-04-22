const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRouter = require("./routes/api/authRouter");
const eventsRouter = require("./routes/api/eventsRouter");
const userRouter = require("./routes/api/userRouter");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use authentication routes
app.use('/api/auth', authRouter);

// Use events routes
app.use('/api/events', eventsRouter);

// Use users routes
app.use('/api/users', userRouter);

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
