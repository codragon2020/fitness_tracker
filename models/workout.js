// Mongoose for the Object Data Modeling library
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Build the workout schema
const WorkoutSchema = new Schema({

  // Adding Date.now to the document
  day: {
    type: Date,
    default: Date.now()
  },

  // Exercises array of nested properties defining the schema types and requirements 
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Please enter an exercise type."
      },
      name: {
        type: String,
        trim: true,
        required: "Please enter an exercise name."
      },
      duration: {
        type: Number,
        required: false,
      },
      weight: {
        type: Number,
        required: false,
      },
      reps: {
        type: Number,
        required: false,
      },
      sets: {
        type: Number,
        required: false,
      },
      distance: {
        type: Number,
        required: false,
      },
    }
  ],
}, 
{ toJSON: { virtual: true } }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

// Export Workout to be used by the routes
module.exports = Workout;