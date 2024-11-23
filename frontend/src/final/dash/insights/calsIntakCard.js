import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from 'react-bootstrap/Card';
import './insight.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function CalsIntakeInsight({userId,goalTarget,workoutValue}) {

  console.log("CalsIntakeInsight",{userId,goalTarget,workoutValue});

  // Prepare doughnut data
  const doughnutData = {
    labels: ['Calories Intake', 'Remaining Calories'],
    datasets: [
      {
        label: 'Calories Intake',
        data: [workoutValue, goalTarget - workoutValue],
        backgroundColor: ['#FFAD60', '#D3D3D3'], // Customize your colors
        hoverBackgroundColor: ['#FFA500', '#A9A9A9'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    datalabels: {
      display: false,},
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // Tooltips enabled to show percentage
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw; // Raw value from the dataset
            const total = workoutValue + (goalTarget - workoutValue); // Total calories
            const percentage = Math.round((value / total) * 100); // Calculate percentage
            return [`${value} Calorie,${percentage}%`]; // Return the percentage in tooltip
          },
        },
        
      },
    },
  };

  return (
    <div style={{width:"100%"}}>
      {userId ? (
        <Card 
          key={userId} 
          style={{ 
            width: '100%',
            height: "90%", 
            borderColor:"#e0e0e0", 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
          }} 
          className='insight mb-3'
        >
          <Card.Body>
            <Card.Title style={{textAlign:"center", color:"#444444", whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden"}} className='mb-3'>
              Today's calories intake
              </Card.Title>
            <hr style={{margin:"0", padding:"0"}}/>
            <div className="row align-items-center">
              <div className="col-4 d-flex justify-content-end">
                <FontAwesomeIcon icon={faBurger} style={{color:"#E85C0D"}} className="display-4" />
              </div>
              <div className="col-8  align-items-center">
                <p style={{ color:"#FFAD60", whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden" }} className="fw-bold fs-2 m-0 p-0 ">
                  {workoutValue ? `${workoutValue} Kcal` : 'No intake recorded'}
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <Doughnut
                    style={{ width: '100%', height: '80%', marginTop:"2%"}} // Adjust height as needed
                    data={doughnutData}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}

export default CalsIntakeInsight;
