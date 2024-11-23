const mongoose = require("mongoose");
const validator = require("validator");

// const date = new Date();

// const defaultDateStart=date.toLocaleDateString();

// const defaultDateEnd=date.getMonth()+2;

const goalsSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    goalType:{
        type:String,
        required: true
    },
    targetCaloriesBurned: {
        type: Number,
        required: true
    },
     targetCaloriesIntake: {
        type: Number,
        required: true
    },
     targetWaterIntake: {
        type: Number,
        required: true
    },
     targetSteps: {
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
},
// {
//     timestamps:true,
// }
);
module.exports = mongoose.model("Goal", goalsSchema);


/*


    targetWeight:{ //10kg
        type:Number,
        required: true
    },
    targetCaloriesPerWeek:{ //1000kl
        type:Number,
        required: true
    },
    startDate:{ //10
        type:Date,
        required: true
    },
    endDate:{//12    ==========> 8*1000=8000
        type:Date,
        required:true 
    },
    status:{
        type:String,
        enum:['in progress', 'complete', 'not achieved'],
        default: 'in progress'
    }


*/