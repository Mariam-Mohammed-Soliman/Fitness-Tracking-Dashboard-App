const Workout = require("../models/workout-model");
const User = require("../models/user-model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const asyncHandler = require("express-async-handler");

const appError=require('../utils/appError');

const getAllWorkout = asyncHandler(async (req, res,next) => {

    const query = req.query;
    // console.log("query",query);

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip=(page-1)*limit;
    
    const workouts = await Workout.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({
        status: httpStatusText.SUCCESS,
        data: {
            workouts: workouts,
        },
    });
}) ;

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
                    workout: workout,
                },
            });
        }

});

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
            const newWorkout = new Workout({activityType,duration,caloriesBurned});
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
