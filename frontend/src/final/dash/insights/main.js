import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaterInsight from './watercard';
import StepsInsight from './stepscard';
import BurnedCalsInsight from './burnedCalsCard';
import CalsIntakeInsight from './calsIntakCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGoal } from '../../../components/rtkStore/slices/Goal-slice';
import { getWorkout } from '../../../components/rtkStore/slices/Workout-slice';

function MainInsight({userId,goalTarget,workoutValue}) {

  console.log("MainInsight props",{userId,goalTarget,workoutValue});
  let totalCaloriesBurned;

  if(workoutValue==null){
    console.log("workoutValue",workoutValue);
  }else{
    totalCaloriesBurned=workoutValue.activityInfo.reduce((acc, workout) => acc + workout.caloriesBurned, 0);
    console.log("totalCaloriesBurned",totalCaloriesBurned);
  }

  const dispatch=useDispatch();

  return (
    <Card style={{ width: '93%', borderColor: "#e0e0e0", height:"70%"}} className="bg-light mx-0 p-3 pb-0">
      <div className="container">
        
        <div className="row gx-4 gy-4 justify-content-center text-center">
        
          {/* Steps Insight ,,, */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
            <StepsInsight userId={userId} goalTarget={goalTarget.targetSteps||0} workoutValue={workoutValue!=null?workoutValue.steps:0} />
          </div>
          {/* Water Insight */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
            <WaterInsight  userId={userId} goalTarget={goalTarget.targetWaterIntake||0} workoutValue={workoutValue!=null?workoutValue.waterIntake:0}/>
          </div>
          {/* Burned Calories Insight */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
            <BurnedCalsInsight  userId={userId} goalTarget={goalTarget.targetCaloriesBurned||0} workoutValue={totalCaloriesBurned?totalCaloriesBurned:0} />
          </div>
          {/* Calories Intake Insight */}
          <div className="col-12 col-sm-5 col-md-6 col-lg-3 d-flex justify-content-center">
            {/* <CalsIntakeInsight userId={userId} goalTarget={workoutValue!=null?workoutValue.targetCaloriesIntake:1000} workoutValue={workoutValue!=null?workoutValue.caloriesIntake:0}/> */}
            <CalsIntakeInsight userId={userId} goalTarget={goalTarget.targetCaloriesIntake} workoutValue={workoutValue!=null?workoutValue.caloriesIntake:0}/>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MainInsight;
