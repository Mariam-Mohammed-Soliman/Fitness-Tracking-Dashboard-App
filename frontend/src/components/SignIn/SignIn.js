
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../rtkStore/slices/login-slice';
import { getLatestWorkouts } from '../rtkStore/slices/Workout-slice';


export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('sara@gmail.com');
    const [password, setPassword] = useState('mmmmm');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const user=useSelector(state=> state.login);
    console.log("user",user);

    const dispatch=useDispatch();



    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        dispatch(fetchUser({email,password}))
        .unwrap()
          .then((response) => {
            const userId = response?.data?._id; 
            console.log("login success:", userId);
            dispatch(getLatestWorkouts(userId));
            navigate(`/profile/${userId}`);
          })
          .catch((error) => {
            console.error("Signup failed:", error);
          });

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
        }
        if (!password) {
            setPasswordError('Password is required');
        }

        if (!validateEmail(email) || !password) {
            return;
        }

    };

    return (
        <div className='signup-body'>
            <div className="signin-page">
                <div className="signin-container">
                    <h2 style={{ color:" #de96da", fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>
                        Sign In
                    </h2>
                    <form onSubmit={handleSubmit} style={{ marginLeft: '30px' }}>
                        <div className="input-group1">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailError && <p className="error-message1">{emailError}</p>}
                        </div>

                        <div className="input-group1">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordError && <p className="error-message1">{passwordError}</p>}
                        </div>

                        <button className='signbtn1' type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SignIn.css';

// export default function SignIn() {
//     const [username, setUsername] = useState('');
//     const [Gender, setGender] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');  
//     const [currentWeight, setCurrentWeight] = useState('');
//     const [targetWeight, setTargetWeight] = useState('');
//     const [targetCaloriesBurned, setTargetCaloriesBurned] = useState('');
//     const [targetCaloriesIntake, setTargetCaloriesIntake] = useState('');
//     const [height, setHeight] = useState('');
//     const [age, setAge] = useState('');
//     const [dailySteps, setDailySteps] = useState('');
//     const [dailyHydration, setDailyHydration] = useState('');

//     const [userData, setUserData] = useState([]);
//     const navigate = useNavigate();

//     const handleSubmit = (e) => { 
//         e.preventDefault();

//         if (!username || !Gender || !email || !password || 
//             !currentWeight || !targetWeight || 
//             !targetCaloriesBurned || !targetCaloriesIntake || 
//             !height || !age || !dailySteps || !dailyHydration) {
//             alert('Please fill in all fields.');
//             return; 
//         }
     
//         const newUser = {
//             username,
//             Gender,
//             email,
//             password,
//             currentWeight,
//             targetWeight,
//             targetCaloriesBurned,
//             targetCaloriesIntake,
//             height,
//             age,
//             dailySteps,
//             dailyHydration
//         };
       
        

//         setUsername('');
//         setEmail('');
//         setPassword('');
//         setCurrentWeight('');
//         setTargetWeight('');
//         setTargetCaloriesBurned('');
//         setTargetCaloriesIntake('');
//         setHeight('');
//         setAge('');
//         setDailySteps('');
//         setDailyHydration('');

//         console.log('User Data:', newUser);

//         // Navigate to home after successful submission
//         navigate('/profile'); 
//     };

//     return (
//         <div className='signin-wrapper'>
//             <div className="signin-page">
//                 <div className="signin-container">
//                     <h2 className="signin-title">Sign Up</h2>
//                     <form onSubmit={handleSubmit} className="signin-form">
//                         <div className="input-group">
//                             <label className='fs-5'> Email :
                               
//                             </label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="input-group">
//                             <label className='fs-5'>Password:</label>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-row">
//                             <div className="input-group">
//                                 <label className='fs-5'>Username:</label>
//                                 <input
//                                     type="text"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="input-group gender-group">
//                                 <label className='fs-5'>Gender: </label>
//                                 <div className="radio-group">
//                                     <div className="radio-input">
//                                         <input
//                                             type="radio"
//                                             id="gendermal"
//                                             value="male"
//                                             name="gender"
//                                             onChange={(e) => setGender(e.target.value)}
//                                             required
//                                         />
//                                         <label  htmlFor="gendermal">Male</label>
//                                     </div>
//                                     <div className="radio-input">
//                                         <input
//                                             type="radio"
//                                             id="genderf"
//                                             value="female"
//                                             name="gender"
//                                             onChange={(e) => setGender(e.target.value)}
//                                             required
//                                         />
//                                         <label htmlFor="genderf">Female</label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="input-group">
//                                 <label className='fs-5'>Age:</label>
//                                 <input
//                                     type="number"
//                                     value={age}
//                                     onChange={(e) => setAge(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label className='fs-5'>Height:</label>
//                                 <input
//                                     type="number"
//                                     value={height}
//                                     onChange={(e) => setHeight(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="input-group">
//                                 <label className='fs-5'>Current Weight:</label>
//                                 <input
//                                     type="number"
//                                     value={currentWeight}
//                                     onChange={(e) => setCurrentWeight(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label className='fs-5'>Target Weight:</label>
//                                 <input
//                                     type="number"
//                                     value={targetWeight}
//                                     onChange={(e) => setTargetWeight(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="input-group">
//                                 <label className='fs-5'>Target Calories Intake:</label>
//                                 <input
//                                     type="number"
//                                     value={targetCaloriesIntake}
//                                     onChange={(e) => setTargetCaloriesIntake(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label className='fs-5'>Target Calories Burned:</label>
//                                 <input
//                                     type="number"
//                                     value={targetCaloriesBurned}
//                                     onChange={(e) => setTargetCaloriesBurned(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="input-group">
//                                 <label className='fs-5'>Daily Steps:</label>
//                                 <input
//                                     type="number"
//                                     value={dailySteps}
//                                     onChange={(e) => setDailySteps(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label className='fs-5'>Daily Hydration (L):</label>
//                                 <input
//                                     type="number"
//                                     value={dailyHydration}
//                                     onChange={(e) => setDailyHydration(e.target.value)}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <button className='signbtn' type="submit" >Sign Up</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }