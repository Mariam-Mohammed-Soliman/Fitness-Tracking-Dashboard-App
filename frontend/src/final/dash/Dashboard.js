import React, { useEffect, useState } from "react";
import MainInsight from "./insights/main";
import "./Dahboard.css";
import TotalDurationBarChart from "./charts/workoutDuration";
import BurnedCaloriesChart from "./charts/burnedCalsAndDate";
import WeeklyStepsChart from "./charts/stepsPie";
import WeeklyWaterChart from "./charts/waterPie";
import AddActivity from "./btn/addActivity";
import { useDispatch, useSelector } from "react-redux";
import { getLatestWorkouts } from "../../components/rtkStore/slices/Workout-slice";
import { getGoal } from "../../components/rtkStore/slices/Goal-slice";

function Dashboard() {
    const dispatch = useDispatch();

    // User slice
    const user = useSelector(state => state.login);
    console.log("user dashboard",user);
    
    const profileData = user.data?.data;
    const userId = profileData?._id;

    // Goal slice
    const goalId = profileData?.goals[0];
    console.log("goalId",goalId);
    
    const goal = useSelector(state => state.goal);
    const goalData = goal.data?.data?.goal;
    console.log("goalData dashboard",goalData);
    
    // Workout slice
    const workout = useSelector(state => state.workout);
    console.log("workoutSlice dashboard",workout);
    let workoutData = workout?.data?.data?.workouts[0];
    console.log("workoutData length",workout.data.data.workouts[0]);
    console.log("workoutData dashboard",workoutData);
    

    
    const [workoutUpdated, setWorkoutUpdated] = useState(false);
    const handleWorkoutUpdate = () => {
        setWorkoutUpdated((prev) => !prev);
    };    
    
    // Fetch goal and workouts when component mounts
    useEffect(() => {
        if (profileData && goalId) {
            dispatch(getGoal(goalId));
        }
        if (profileData && userId) {
            dispatch(getLatestWorkouts(userId));
        }
    }, [dispatch, profileData,workoutUpdated, userId, goalId]);

    // Handle loading and errors
    if (!profileData || !goalData || !workoutData) {
        return (
            <div className="loading-container">
                <p>Loading data, please wait...</p>
            </div>
        );
    }
    else{

        return (
            <div className="dash container d-flex mt-0 mb-2 pt-0  p-2">
                <h3 className="ms-5 fs-2 mb-3 p-0 mt-3" style={{ color: "#333333" }}>Take a look at your progress!</h3>
    
                <div className="d-flex justify-content-center align-items-center">
                    <MainInsight
                        className="justify-content-center"
                        userId={userId}
                        goalTarget={goalData}
                        workoutValue={workoutData}
                    />
                </div>
    
                <div className="d-flex ">
                    <BurnedCaloriesChart
                        user={profileData}
                        workoutValue={workout.data?.data}
                    />
    
                    <TotalDurationBarChart className="col-6"
                        user={profileData}
                        goalTarget={goalData?.targetCaloriesIntake}
                        workoutValue={workout.data?.data.workouts}
                     />
                </div>
    
                <div className="d-flex ">
                    <WeeklyWaterChart className="col-5 "
                    user={profileData}
                    goalTarget={goalData?.targetWaterIntake}
                    workoutValue={workout.data?.data.workouts}
                     />
                    <WeeklyStepsChart
                        user={profileData}
                        goalTarget={goalData?.targetSteps}
                        workoutValue={workout.data?.data}
                    />

        <AddActivity className="col-1" userId={userId} onWorkoutUpdate={handleWorkoutUpdate}/>

        

        
                </div>
    
            </div>
        );
    }

}

export default Dashboard;
