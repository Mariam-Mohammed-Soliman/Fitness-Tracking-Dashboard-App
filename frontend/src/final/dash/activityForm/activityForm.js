import React, { useState } from 'react';
import './activityForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../../components/rtkStore/slices/Workout-slice';

const ActivityForm = ({ toggleForm,userId,onWorkoutUpdate  }) => {

    const [errors, setErrors] = useState({});
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    const dispatch=useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const activityInfo = [
            {
                activityType:activityType1,
                duration:duration1,
                caloriesBurned: colsBurned1
            },
            // {
            //     activityType:activityType2,
            //     duration:duration2,
            //     caloriesBurned: colsBurned2
            // },
            // {
            //     activityType:activityType3,
            //     duration:duration3,
            //     caloriesBurned: colsBurned3
            // },
    ];
    
        // Check the data being dispatched
        console.log("Workout Data:", {
            userId, 
            activityInfo,
            caloriesIntake, 
            waterIntake, 
            steps
        });
    
        dispatch(addWorkout({ userId, activityInfo, caloriesIntake, waterIntake, steps }))
            .then(() => {
                // Trigger workout update in parent component
                onWorkoutUpdate();
                toggleForm(); // Close the form
            })
            .catch((error) => {
                console.error("Error adding workout:", error);
            });

    };
    
    const [caloriesIntake,setCaloriesIntake]=useState('6000');
    const [waterIntake,setWaterIntake]=useState('2');
    const [steps,setSteps]=useState('5000');

    const [activityType1,setActivityType1]=useState('Running');
    const [duration1,setDuration1]=useState('30');
    const [colsBurned1,setCalsBurned1]=useState('2000');

    // const [activityType2,setActivityType2]=useState('');
    // const [duration2,setDuration2]=useState('');
    // const [colsBurned2,setCalsBurned2]=useState('');

    // const [activityType3,setActivityType3]=useState('');
    // const [duration3,setDuration3]=useState('');
    // const [colsBurned3,setCalsBurned3]=useState('');

    return (
        <div className={`activity-form-container ${showThankYouMessage ? 'shrink-container' : ''}`}>
            {!showThankYouMessage && (
                <>
                    <h2>Add New Activity <FontAwesomeIcon icon={faDumbbell} /></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-row" style={{borderBottom:"2px solid grey ", paddingBottom:"1%"}}>
                            <div className="input-group">
                                <label>Calories Intake:</label>
                                <input
                                    type="text"
                                    name="caloriesIntake"
                                    onChange={(e) => setCaloriesIntake(e.target.value)}
                                    value={caloriesIntake}
                                />
                                {errors.caloriesIntake && <div className="error">{errors.caloriesIntake}</div>}
                            </div>
                            <div className="input-group">
                                <label>Water Intake (L):</label>
                                <input
                                    type="text"
                                    step="0.1"
                                    name="waterIntake"
                                    onChange={(e) => setWaterIntake(e.target.value)}
                                    value={waterIntake}
                                />
                                {errors.waterIntake && <div className="error">{errors.waterIntake}</div>}
                            </div>
                            <div className="input-group">
                                <label>Steps Count:</label>
                                <input
                                    type="text"
                                    name="stepsCount"
                                    onChange={(e) => setSteps(e.target.value)}
                                    value={steps}
                                />
                                {errors.stepsCount && <div className="error">{errors.stepsCount}</div>}
                            </div>
                        </div>

                        <h4>Activity :</h4>
                        <div className="input-row" style={{borderBottom:"2px solid grey ", paddingBottom:"1%"}}>
                            <div className="input-group">
                                <label>Activity:</label>
                                <select
                                    name="activity1"
                                    onChange={(e) => setActivityType1(e.target.value)}
                                    value={activityType1}
                                >
                                    <option value="" disabled hidden>Select Activity:</option>
                                    <option value="Running">Running</option>
                                    <option value="Cycling">Cycling</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.activity1 && <div className="error">{errors.activity1}</div>}
                            </div>
                            <div className="input-group">
                                <label>Duration:</label>
                                <input
                                    type="text"
                                    name="duration1"
                                    onChange={(e) => setDuration1(e.target.value)}
                                    value={duration1}
                                />
                                {errors.duration1 && <div className="error">{errors.duration1}</div>}
                            </div>
                            <div className="input-group">
                                <label>Burned Calories:</label>
                                <input
                                    type="text"
                                    name="burnedCalories1"
                                    onChange={(e) => setCalsBurned1(e.target.value)}
                                    value={colsBurned1}
                                />
                                {errors.burnedCalories1 && <div className="error">{errors.burnedCalories1}</div>}
                            </div>
                        </div>
                        {/* <h4>Activity 2 :</h4>
                        <div className="input-row" style={{borderBottom:"2px solid grey ", paddingBottom:"1%"}}>
                            <div className="input-group">
                                <label>Activity:</label>
                                <select
                                    name="activity2"
                                    onChange={(e) => setActivityType2(e.target.value)}
                                    value={activityType2}
                                >
                                    <option value="" disabled hidden>Select Activity:</option>
                                    <option value="Running">Running</option>
                                    <option value="Cycling">Cycling</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.activity1 && <div className="error">{errors.activity1}</div>}
                            </div>
                            <div className="input-group">
                                <label>Duration:</label>
                                <input
                                    type="text"
                                    name="duration1"
                                    onChange={(e) => setDuration2(e.target.value)}
                                    value={duration2}
                                />
                                {errors.duration2 && <div className="error">{errors.duration2}</div>}
                            </div>
                            <div className="input-group">
                                <label>Burned Calories:</label>
                                <input
                                    type="text"
                                    name="burnedCalories2"
                                    onChange={(e) => setCalsBurned2(e.target.value)}
                                    value={colsBurned2}
                                />
                                {errors.burnedCalories2 && <div className="error">{errors.burnedCalories2}</div>}
                            </div>
                        </div>
                        <h4>Activity 3 :</h4>
                        <div className="input-row" style={{borderBottom:"2px solid grey ", paddingBottom:"1%"}}>
                            <div className="input-group">
                                <label>Activity:</label>
                                <select
                                    name="activity3"
                                    onChange={(e) => setActivityType3(e.target.value)}
                                    value={activityType3}
                                >
                                    <option value="" disabled hidden>Select Activity:</option>
                                    <option value="Running">Running</option>
                                    <option value="Cycling">Cycling</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.activity3 && <div className="error">{errors.activity3}</div>}
                            </div>
                            <div className="input-group">
                                <label>Duration:</label>
                                <input
                                    type="text"
                                    name="duration3"
                                    onChange={(e) => setDuration3(e.target.value)}
                                    value={duration3}
                                />
                                {errors.duration3 && <div className="error">{errors.duration3}</div>}
                            </div>
                            <div className="input-group">
                                <label>Burned Calories:</label>
                                <input
                                    type="text"
                                    name="burnedCalories3"
                                    onChange={(e) => setCalsBurned3(e.target.value)}
                                    value={colsBurned3}
                                />
                                {errors.burnedCalories3 && <div className="error">{errors.burnedCalories3}</div>}
                            </div>
                        </div>
                         */}
                        <div className="button-row">
                            <button type="submit" style={{ backgroundColor: "#b679ac" }}>Submit</button>
                            <button type="button" onClick={toggleForm}>Close</button>
                        </div>
                    </form>
                </>
            )}

            {showThankYouMessage && (
                <div className="thank-you-message">
                    Thanks for logging your today's activity. Waiting for you again tomorrow!
                </div>
            )}
        </div>
    );
};

export default ActivityForm;