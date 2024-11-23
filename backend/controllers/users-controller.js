const User = require("./../models/user-model");
const { validationResult } = require("express-validator");
const httpStatusText = require("./../utils/httpStatusText");
const asyncHandler = require("express-async-handler");
const appError=require('./../utils/appError');
const generateJWT = require("../utils/generateJWT");


const bcrypt = require('bcrypt');

const getAllUsers=asyncHandler(async (req, res,next) => {
    const query = req.query;
    // console.log("query",query);
    
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip=(page-1)*limit;
    
    const users = await User.find({},{"__v":false,"password":false}).populate("workouts").populate("goals").limit(limit).skip(skip);
    res.json({
        status: httpStatusText.SUCCESS,
        data: {
        users: users,
        },
    });
}) ;
const getOneUser=asyncHandler(async (req, res,next) => {
    const userID = req.params.userId;
    // console.log("query",userID);
    
    const user = await User.find({_id:userID},{"__v":false,"password":false}).populate("workouts");
    // const user = await User.findOne({_id:userID})
    res.json({
        status: httpStatusText.SUCCESS,
        data: {
        user: user,
        },
    });
}) ;


const updateUser=asyncHandler(async (req, res,next) => {
    const userId = req.params.userId;

    console.log("userId",userId);
    
        let updatedUser = await User.updateOne(
            { _id: userId },
            { $set: { ...req.body } }
        );

        console.log("updatedUser", {...req.body});

        const user = await User.findOne({_id:userId});
        console.log("user",user);
        
        
        if (!updatedUser) {
            const error= appError.create("User not found",400, httpStatusText.FAIL);
            return next(error);
        }
        res.json({
            status: httpStatusText.SUCCESS,
            dataState: updatedUser,
            data:user
        })
}) ;

const register=asyncHandler(async (req, res,next) => {
    // console.log(req.body);
    const {userName,email,gender,password,age,height,weight}=req.body;

    const errors = validationResult(req);

    const oldUser=await User.findOne({email: email}).populate('goals').populate('workouts');

    if (oldUser) {
        const error= appError.create("email is exist",400, httpStatusText.FAIL)
        return next(error);
    } else {
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser = new User({
            userName,
            email,
            gender,
            password:hashedPassword,
            age,
            height,
            weight
            
        });
        const token = await generateJWT({email: newUser.email, id: newUser._id});


        // console.log("token",token);
        
        newUser.token=token;

        // console.log("newUser from userController",newUser);
        
        await newUser.save();
        res.json({
        status: httpStatusText.SUCCESS,
        data:newUser,
        });
    }
}) ;


const login=asyncHandler(async (req, res,next) => {

    const {email,password}=req.body;

    const user=await User.findOne({email: email});

    if(!user) {
        const error= appError.create("user not found",400, httpStatusText.FAIL)
        return next(error);
    }
    if(!user && !password) {
        const error= appError.create("email && password are required",400, httpStatusText.FAIL)
        return next(error);
    }

    const matchedPassword= await bcrypt.compare(password,user.password)
    if(user && matchedPassword) {

        const token = await generateJWT({email: user.email, id: user._id});
        return res.json({ 
            status: httpStatusText.SUCCESS,
             tokenData: {token},
             data:user
            });

        
    }
    else{
        const error= appError.create("something wrong",500, httpStatusText.ERROR)
        return next(error);
    }
}) ;

const deleteUsers=asyncHandler(async (req, res,next) => {
    const userAge = req.params.userAge;
    const deletedUsers = await User.deleteMany({age:25});
    res.json({
        status: httpStatusText.SUCCESS,
        data: null,
    });
}) ;


module.exports ={
    getAllUsers,
    getOneUser,
    updateUser,
    register,
    login,
    deleteUsers
}