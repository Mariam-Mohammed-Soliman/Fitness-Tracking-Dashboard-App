require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const httpStatusText = require("./utils/httpStatusText");

const cors=require('cors');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connect to DB successfully");
    
})
const app = express();
app.use(express.json());
app.use(cors());


const workoutRouter=require('./routes/workout-route');
const userRouter=require('./routes/user-route');
const goalsRouter=require('./routes/goals-route');
const progressRouter=require('./routes/progress-route');
app.use('/api/workout',workoutRouter);
app.use('/api/users',userRouter);
app.use('/api/goals',goalsRouter);
app.use('/api/progress',progressRouter);

app.all('*',(req,res,next)=>{
    return res.status(404).json({
        status: httpStatusText.ERROR,
        message:"this resources is not available"
    })
});


app.use((err,req,res,next)=>{
    res.status(err.statusCode|| 500).json({
        status:err.statusText || httpStatusText.ERROR,
        message:err.message,
        code:err.statusCode || 500,
        data:null
     });
})


app.listen(process.env.PORT || 3000,() => {
    console.log("listening on port ",process.env.PORT);
  })