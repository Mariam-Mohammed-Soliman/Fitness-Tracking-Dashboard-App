const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "must be a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"] ,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    workouts:[{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Workout'
    }],
    goals:[{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Goal'
    }],
    token:{
      type:String,
  }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);