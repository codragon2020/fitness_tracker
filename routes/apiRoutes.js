const db = require("../models/index");
require('../models/workout.js');

module.exports = function (app) {
    app.get("/api/config", (req, res) => {
        res.json({
            success: true,
        }).catch(err => {
            console.log(err)
        });
        // console.log("/api/config route has been hit!");
    });

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

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(function (workouts) {
                res.json(workouts);
            })
            .catch(err => {
                console.log(err);
            });
    });

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
