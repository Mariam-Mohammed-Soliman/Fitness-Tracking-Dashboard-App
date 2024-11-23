import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserGoal, userRegistration } from '../rtkStore/slices/login-slice';
import { addGoal, getGoal } from '../rtkStore/slices/Goal-slice';


export default function SignUp() {

    const [userName, setUserName] = useState('test');
    const [email, setEmail] = useState('test@example.com');
    const [gender, setGender] = useState('male');
    const [password, setPassword] = useState('123');
    const [age, setAge] = useState(25);
    const [height, setHeight] = useState(160);
    const [weight, setWeight] = useState(80);

    const [targetWeight, setTargetWeight] = useState(60);
    const [targetCaloriesBurned, setTargetCaloriesBurned] = useState(1900);
    const [targetCaloriesIntake, setTargetCaloriesIntake] = useState(2000);
    const [targetWaterIntake, setTargetWaterIntake] = useState(3);
    const [targetSteps, setTargetSteps] = useState(6000);

  const navigate=useNavigate();


  //user Slice
  const user=useSelector(state=>state.login);
  console.log("user SignUp",user);

  //goal Slice
  const goal=useSelector(state=>state.goal);
  console.log("goal",goal);

  const dispatch=useDispatch()



    const handleSubmit = (e) => { 
        e.preventDefault();

        dispatch(userRegistration({
            userName,
            email,
            gender,
            password,
            age: parseInt(age),
            height: parseInt(height),
            weight: parseInt(weight)
        }))
          .unwrap()
          .then((response) => {
            const userId = response?.data._id; 
            console.log("Registration success:", userId);
            dispatch(addGoal({
                userId,
                targetWeight:parseInt(targetWeight),
                targetCaloriesBurned:parseInt(targetCaloriesBurned),
                targetCaloriesIntake:parseInt(targetCaloriesIntake),
                targetWaterIntake:parseInt(targetWaterIntake),
                targetSteps:parseInt(targetSteps)
            }))
            .unwrap()
            .then((goalResponse) => {
                const goalId = goalResponse?.data.goal._id; 
                console.log("goalId:", goalId);
                const updatedUserGoalId = {
                    ...response.data,
                    goals: [...response.data.goals, goalId]  // Add the new goal ID to the user's goals array
                  };

                //   console.log("updatedUserGoalId",updatedUserGoalId);
                  
            dispatch(updateUserGoal(updatedUserGoalId))
            navigate(`/profile/${userId}`);
          });
          })
          .catch((error) => {
            console.error("Signup failed:", error);
          });
    };

    return (
        <div className='signin-wrapper'>
            <div className="signin-page">
                <div className="signin-container">
                    <h2 className="signin-title">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="input-group">
                            <label className='fs-5'> Email:
                    
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className='fs-5'>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className='fs-5'>Username:</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group gender-group">
                                <label className='fs-5'>Gender: </label>
                                <div className="radio-group">
                                    <div className="radio-input">
                                        <input
                                            type="radio"
                                            id="gendermal"
                                            value="male"
                                            name="gender"
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                            checked
                                        />
                                        <label  htmlFor="gendermal">Male</label>
                                    </div>
                                    <div className="radio-input">
                                        <input
                                            type="radio"
                                            id="genderf"
                                            value="female"
                                            name="gender"
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="genderf">Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className='fs-5'>Age:</label>
                                <input
                                    type="text"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className='fs-5'>Height:</label>
                                <input
                                    type="text"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className='fs-5'>Weight:</label>
                                <input
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className='fs-5'>Target Weight:</label>
                                <input
                                    type="text"
                                    value={targetWeight}
                                    onChange={(e) => setTargetWeight(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className='fs-5'>Target Calories Intake:</label>
                                <input
                                    type="text"
                                    value={targetCaloriesIntake}
                                    onChange={(e) => setTargetCaloriesIntake(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className='fs-5'>Target Calories Burned:</label>
                                <input
                                    type="text"
                                    value={targetCaloriesBurned}
                                    onChange={(e) => setTargetCaloriesBurned(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label className='fs-5'>Daily Hydration (L):</label>
                                <input
                                    type="text"
                                    value={targetWaterIntake}
                                    onChange={(e) => setTargetWaterIntake(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className='fs-5'>Daily Steps:</label>
                                <input
                                    type="text"
                                    value={targetSteps}
                                    onChange={(e) => setTargetSteps(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button className='signbtn' type="submit" >Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
