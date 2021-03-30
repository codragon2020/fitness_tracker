// Requiring path to use relative routes for HTML files
const path = require("path");

module.exports = app => {
    // HTML redirect for Dashboard page
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
    // HTML redirect for Fitness Tracker page
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
};
