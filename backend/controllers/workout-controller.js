const Workout = require("../models/workout-model");
const User = require("../models/user-model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const asyncHandler = require("express-async-handler");

const appError=require('../utils/appError');

const getAllWorkout =asyncHandler(  async (req, res,next) => {
    const userId = req.params.userId;
    console.log("userId",userId);

    // Calculate the date 7 days ago from now
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// Find workouts for the user within the last 7 days
const workout = await Workout.find({
  userId,
  createdAt: {
    $gte: sevenDaysAgo,  // Greater than or equal to 7 days ago
  },
})
  .sort({ createdAt: -1 })  // Sort from latest to oldest
  .limit(7);  // Limit the result to 7 workouts

    console.log(workout);
    
    if(!workout){
        const error= appError.create("workout not found",404, httpStatusText.FAIL);
        return next(error);
    }
    else{
    res.json({
            status: httpStatusText.SUCCESS,
            data: {
                workouts: workout,
            },
        });
    }

});

const getWorkout =asyncHandler(  async (req, res,next) => {
        const workoutId = req.params.workoutId;
        console.log("workoutId",workoutId);
        
        const workout = await Workout.findById(workoutId);
        
        
        if(!workout){
            const error= appError.create("workout not found",404, httpStatusText.FAIL);
            return next(error);
        }
        else{
        res.json({
                status: httpStatusText.SUCCESS,
                data: {
                    workouts: workout,
                },
            });
        }

});

// const addWorkout =asyncHandler( async (req, res,next) => {

//     const {userId,activityInfo,caloriesIntake,waterIntake,steps}=req.body;
//     console.log("req.body",req.body);

//     const user = await User.findOne({_id:userId});

//     console.log("user addWorkout===>>>",user);
    
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             const error= appError.create(errors.array(),400, httpStatusText.FAIL)
//             return next(error);
//         } else {
//             const newWorkout = new Workout({userId,activityInfo,caloriesIntake,waterIntake,steps});
//             console.log("newWorkout",newWorkout);
//             // await newWorkout.save();
//             res.json({
//             status: httpStatusText.SUCCESS,
//             data: { workout: newWorkout },
//             });
//             // user.workouts.push(newWorkout);
//             // await user.save();
//         }
//     }
// )



const addWorkout = asyncHandler(async (req, res, next) => {
    console.log("Received data in backend:", req.body); // Log incoming data
    
    const { userId, activityInfo, caloriesIntake, waterIntake, steps } = req.body;

    const user = await User.findOne({_id:userId});

        console.log("user addWorkout===>>>",user);

    console.log("Preparing to save workout with data:", {
        userId,
        activityInfo,
        caloriesIntake,
        waterIntake,
        steps
    });

    if (!userId || !activityInfo || !caloriesIntake || !waterIntake || !steps) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new workout
    const newWorkout = new Workout({
        userId,
        activityInfo,
        caloriesIntake,
        waterIntake,
        steps
    });

    console.log("newWorkout",newWorkout);
    

    // Save the workout to the database
    const savedWorkout = await newWorkout.save();
    // res.status(201).json(savedWorkout);

    res.json({
        status: httpStatusText.SUCCESS,
        data: {workouts: savedWorkout },
        });

    user.workouts.push(newWorkout);
    await user.save();
});



const updateWorkout = asyncHandler(async (req, res,next) => {
    const workoutId = req.params.workoutId;
    
        let updatedWorkout = await Workout.updateOne(
            { _id: workoutId },
            { $set: { ...req.body } }
        );
        if (!updatedWorkout) {
            const error= appError.create("course not found",400, httpStatusText.FAIL);
            return next(error);
        }
        res.json({
            status: httpStatusText.SUCCESS,
            data: updatedWorkout,
        })
    }

)

    const deleteWorkout =asyncHandler( async (req, res,next) => {
            const workoutId = req.params.workoutId;
            const deletedWorkout = await Workout.deleteOne({ _id: workoutId });
            res.json({
                status: httpStatusText.SUCCESS,
                data: null,
            });
        }
    )

    module.exports = {
        getAllWorkout,
        getWorkout,
        addWorkout,
        updateWorkout,
        deleteWorkout,
    };