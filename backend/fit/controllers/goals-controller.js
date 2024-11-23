const Goal = require("../models/goals-model");
const User = require("../models/user-model");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");
const asyncHandler = require("express-async-handler");

const appError=require('../utils/appError');

const getAllGoals=asyncHandler(async (req, res,next) => {
    const query = req.query;
    // console.log("query",query);

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip=(page-1)*limit;
    
    const goals = await Goal.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({
        status: httpStatusText.SUCCESS,
        data: {
            goals: goals,
        },
    });
}) ;

const getOneGoal=asyncHandler(async (req, res,next) => {
    const goalId = req.params.goalId;
        console.log("goalId",goalId);
        
        const goal = await Goal.findById(goalId);
        
        if(!goal){
            const error= appError.create("goal not found",404, httpStatusText.FAIL);
            return next(error);
        }
        else{
        res.json({
                status: httpStatusText.SUCCESS,
                data: {
                    goal: goal,
                },
            });
        }
}) ;
const addGoal=asyncHandler(async (req, res,next) => {
    console.log("req.body",req.body);
    const {userId,goalType,targetCaloriesBurned,targetCaloriesIntake,targetWaterIntake,targetSteps}=req.body;

    const user = await User.findOne({_id:userId});

    console.log("user",user);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error= appError.create(errors.array(),400, httpStatusText.FAIL)
            return next(error);
        } else {
            const newGoal = new Goal(req.body);
            console.log("newGoal",newGoal);
            await newGoal.save();
            res.json({
            status: httpStatusText.SUCCESS,
            data: { goal: newGoal },
            });

            user.goals.push(newGoal);
            await user.save();

        }
}) ;

const updateGoal=asyncHandler(async (req, res,next) => {
    const goalId = req.params.goalId;
    
        let updatedGoal = await Goal.updateOne(
            { _id: goalId },
            { $set: { ...req.body } }
        );
        if (!updatedGoal) {
            const error= appError.create("goal not found",400, httpStatusText.FAIL);
            return next(error);
        }
        res.json({
            status: httpStatusText.SUCCESS,
            data: updatedGoal,
        })
}) ;

const deleteGoal=asyncHandler(async (req, res,next) => {
    const goalId = req.params.goalId;
    const deletedGoal = await Goal.deleteOne({ _id: goalId });
    res.json({
        status: httpStatusText.SUCCESS,
        data: null,
    });
}) ;

module.exports ={
    getAllGoals,
    getOneGoal,
    addGoal,
    updateGoal,
    deleteGoal
}