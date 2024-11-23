const express= require('express');
const router= express.Router();

const progressController=require('../controllers/progress-controller');

router.route("/searchByDate")
    .get(progressController.getGoalsByDate)

router.route("/:userId")
    .post(progressController.getProgress)
    

module.exports = router;