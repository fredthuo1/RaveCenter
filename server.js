const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

// Accessing the path module
const path = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use the cors middleware
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Create a simple route
app.get("/", (req, res) => {
    res.send("Welcome to MERN Stack Authenticator!");
});

// Use authentication routes
app.use("/api/auth", authRoutes);

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


