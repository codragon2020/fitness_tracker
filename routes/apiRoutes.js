// Model dependencies
const db = require("../models/index");
require('../models/workout.js');

module.exports = app => {

    // API GET request with aggregate method that calculates aggregate values for the data in a collection
    app.get("/api/workouts", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ]).then(function (workouts) {
            res.json(workouts);
        }).catch(err => {
            console.log(err)
        });
    });

    // API POST for creating a New Workout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(function (workouts) {
                res.json(workouts);
            })
            .catch(err => {
                console.log(err);
            });
    });

    // API GET when opening the stats page to populate the charts
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ]).sort({ _id: -1 })
            .limit(7)
            .then(function (workouts) {
                res.json(workouts);
                console.log(workouts);
            })
            .catch(err => {
                console.log(err);
            });
    });

    // API PUT to update the current workout by adding an exercise
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            req.params.id,
            { $push: { exercises: req.body } },
        ).then(function (workouts) {
            res.json(workouts);
        }).catch(err => {
            console.log(err);
        });
    });
};
