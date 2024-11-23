import React from 'react';
import './WorkoutCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
// const workoutData = [
//   {
//     date: '2024-10-12',
//     caloriesIntake: 2200,
//     waterIntake: 2.5,
//     steps: 10000,
//     activities: [
//       { activity: 'Running', duration: 30, caloriesBurned: 300 },
//       { activity: 'Cycling', duration: 45, caloriesBurned: 400 },
//     ],
//   },
//   {
//     date: '2024-10-13',
//     caloriesIntake: 2100,
//     waterIntake: 2.0,
//     steps: 9500,
//     activities: [
//       { activity: 'Swimming', duration: 60, caloriesBurned: 500 },
//     ],
//   },
//   {
//     date: '2024-10-14',
//     caloriesIntake: 2300,
//     waterIntake: 2.7,
//     steps: 11000,
//     activities: [
//       { activity: 'Strength Training', duration: 50, caloriesBurned: 350 },
//     ],
//   },
//   {
//     date: '2024-10-15',
//     caloriesIntake: 2400,
//     waterIntake: 2.8,
//     steps: 10500,
    
//    caloriesBurned: 600 
//   },
//   {
//     date: '2024-10-16',
//     caloriesIntake: 2200,
//     waterIntake: 2.6,
//     steps: 9700,
//     caloriesBurned: 250
//   },
//   ,
//   {
//     date: '2024-10-16',
//     caloriesIntake: 2200,
//     waterIntake: 2.6,
//     steps: 9700,
//     caloriesBurned: 250
//   },
//   {
//     date: '2024-10-16',
//     caloriesIntake: 2200,
//     waterIntake: 2.6,
//     steps: 9700,
//      caloriesBurned: 250 
//   }
// ];

const WorkoutCard = ({workoutData}) => {
  // console.log("workoutData",workoutData);

  return (
    <>
      {workoutData.map((workout, index) => (
        
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4 " key={index}>
          <div className=" workout-card ">
            <div className="card-body text-center pt-3 pb-5">
              <h3 className="date fw-bold pt-0 mt-0 "> <FontAwesomeIcon icon={faCalendarDays} style={{marginRight:"2%"}}/>{
               new Date(workout.createdAt).toISOString().slice(0, 10)
    }</h3>
             <hr/>
              <p className='fs-5 text-center'><strong>Water Intake:</strong><span className='data'> {workout?.waterIntake} L</span></p>
              
              <p className='fs-5 text-center'><strong>Steps:</strong><span className='data'>  {workout?.steps} steps</span></p>
              
              <p className='fs-5 text-center'><strong>Calories Intake:</strong> <span className='data'> {workout?.caloriesIntake} kcal </span></p>
              <p className='fs-5 text-center'><strong>Burned Calories:</strong> <span className='data'> {
                workout?.activityInfo[0].caloriesBurned
                } kcal </span></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WorkoutCard;