const express= require('express');
const router= express.Router();

const{body,validationResult}=require('express-validator');


const goalsController=require('./../controllers/goals-controller')

const bodyValidation=[
    // body('goalType').notEmpty().withMessage("goalType is required"),
    body('targetCaloriesBurned').notEmpty().withMessage("targetCaloriesBurned is required"),
    body('targetCaloriesIntake').notEmpty().withMessage("targetCaloriesIntake is required")
]

router.route("/")
    .get(goalsController.getAllGoals)
    .post(bodyValidation,goalsController.addGoal);

router.route("/:goalId")
    .get(goalsController.getOneGoal)
    .patch(goalsController.updateGoal)
    .delete(goalsController.deleteGoal)


module.exports = router;