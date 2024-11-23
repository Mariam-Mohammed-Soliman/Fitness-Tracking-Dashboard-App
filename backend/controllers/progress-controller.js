const Workout = require("../models/workout-model");
const Goal = require("../models/goals-model");
const Progress = require("../models/progress-model");
const User = require("../models/user-model");
const httpStatusText = require("../utils/httpStatusText");
const asyncHandler = require("express-async-handler");

const appError=require('../utils/appError');


const getProgress =asyncHandler( async (req, res,next) => {

    const { userId } = req.params;
    const user = await User.find({ userId });
    const userGoals = await Goal.find({ userId });
    const userWorkouts = await Workout.find({ userId });


    // console.log("userGoals======>\t",userGoals,"\nuserWorkouts========>\t", userWorkouts);

     // Example: Calculate total calories burned in the current week
    const totalCaloriesBurned = userWorkouts.reduce((acc, workout) => acc + workout.caloriesBurned, 0);
    for(let i = 0; i < userGoals.length; i++){

        const progress = {
            goalId: userGoals[i]._id, // assuming single goal for simplicity
            goalName: userGoals[i].goalType,
            currentWeight:user.weight, // assuming single goal for simplicity
            caloriesBurned: totalCaloriesBurned,
            progressPercentage: (totalCaloriesBurned / userGoals[i].targetCaloriesPerWeek) * 100,
            workoutDetails:userWorkouts.map(workoutDetail=> workoutDetail.activityType)
        };

        console.log("\nprogress========>\t",progress);

        const newProgress = await new Progress(progress);
            console.log("newProgress",newProgress);
            await newProgress.save();
            res.json({
            status: httpStatusText.SUCCESS,
            data: { progress: newProgress },
            });

        // res.json(progress);
    }

});

const getGoalsByDate =asyncHandler( async (req, res,next) => {
    const { startDate, endDate } = req.body;
    const searchDate= await Goal.find({
        createdAt: {
          $gte: new Date(startDate),  // Greater than or equal to startDate
          $lte: new Date(endDate)     // Less than or equal to endDate
        }
    });
    
    res.status(200).json(searchDate);
    

})



/*
const addWorkout =asyncHandler( async (req, res,next) => {

    console.log("req.body",req.body);
    const {userId,activityType,duration,caloriesBurned}=req.body;

    const user = await User.findOne({_id:userId});

    console.log("user",user);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error= appError.create(errors.array(),400, httpStatusText.FAIL)
            return next(error);
        } else {
            const newWorkout = new Workout(req.body);
            console.log("newWorkout",newWorkout);
            await newWorkout.save();
            res.json({
            status: httpStatusText.SUCCESS,
            data: { workout: newWorkout },
            });
            user.workouts.push(newWorkout);
            await user.save();
        }
    }
)

*/



module.exports = {
    getProgress,
    getGoalsByDate
};
