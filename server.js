const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// ...
const path = require('path');

// Accessing the path module
const authRoutes = require('./routes/auth'); 

const eventRoutes = require('./routes/events');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the cors middleware
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use authentication routes
app.use("/api/auth", authRoutes);

// Use events routes
app.use("/api/events", eventRoutes);

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

