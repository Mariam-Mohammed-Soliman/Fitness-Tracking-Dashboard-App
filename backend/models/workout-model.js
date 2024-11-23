const mongoose= require('mongoose');
/// steps attribute
const workoutSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    activityInfo:[{
        activityType:{
            type:String,
            enum: ['Running', 'Cycling','Weightlifting','other'],
            default: 'Running',
            required: true
        },
        duration:{
            type:Number,
            required: true
        },
        caloriesBurned:{
            type:Number,
            required: true
        }
    }],
     caloriesIntake: {
        type: Number,
        required: true
    },
     waterIntake: {
        type: Number,
        required: true
    },
     steps: {
        type: Number,
        required: true
    }
  },
  {
      timestamps:true,
  }
);

  module.exports  = mongoose.model('Workout', workoutSchema);
