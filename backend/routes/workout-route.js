const express= require('express');
const router= express.Router();

const{body,validationResult}=require('express-validator');

const workoutController=require('../controllers/workout-controller');

const bodyValidation=[
    // body('activityType').notEmpty().withMessage("activityType is required"),
    // body('duration').notEmpty().withMessage("duration is required"),
    // body('caloriesBurned').notEmpty().withMessage("caloriesBurned is required")
]

router.route("/")
.post(bodyValidation,workoutController.addWorkout);

router.route("/:userId")
    .get(workoutController.getAllWorkout);

router.route("/:workoutId")
    .get(workoutController.getWorkout)
    .patch(workoutController.updateWorkout)
    .delete(workoutController.deleteWorkout);


module.exports = router;