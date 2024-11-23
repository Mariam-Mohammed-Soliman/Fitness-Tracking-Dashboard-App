const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    currentWeight: { type: Number }, // If tracking weight loss or gain
    caloriesBurned: { type: Number }, // Total calories burned during a time period
    progressPercentage: { type: Number }, // Total calories burned during a time period
    workoutDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Progress", progressSchema);