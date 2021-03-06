// Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(logger("dev"));

// Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose connected successfully.");
});

connection.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
});

// Require Routes
require("./routes/htmlRoutes")(app)
require("./routes/apiRoutes")(app)

// Listen for connection
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});