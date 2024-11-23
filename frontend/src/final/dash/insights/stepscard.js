import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from 'react-bootstrap/Card';
import useFetchUsersData from '../fetch/fetch';
import './insight.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function StepsInsight({userId,goalTarget,workoutValue}) {
  
  console.log("StepsInsight",{userId,goalTarget,workoutValue});
  
  
  // Prepare doughnut data
  const doughnutData = {
    labels: ['Steps Taken', 'Remaining Steps'],
    datasets: [
      {
        label: 'Steps',
        data: [workoutValue, goalTarget - workoutValue],
        backgroundColor: ['#88D66C', '#D3D3D3'], // Customize your colors
        hoverBackgroundColor: ['#76c043', '#A9A9A9'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const total = workoutValue + (goalTarget - workoutValue);
            const percentage = Math.round((value / total) * 100); 

            // Return both the step count and the percentage
            return [`${value} Steps ,${percentage}%`];
          },
          // Add a label for each section of the doughnut
          afterLabel: (tooltipItem) => {
            const total = workoutValue + (goalTarget - workoutValue);
            const percentage = Math.round((tooltipItem.raw / total) * 100); 
            // return `${percentage}%`; 
          }
        },
      },
    },
  };

  return (
    <div style={{ 
      width: '100%', }}>
      {userId ? (
        <Card 
          key={userId} 
          style={{ 
            width: '100%', 
            height: '90%', 
            borderColor:"#e0e0e0", 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
          }} 
          className='insight mb-3'
        >
          <Card.Body>
            <Card.Title style={{textAlign:"center", color:"#444444"}} className='mb-3'>Today's Steps</Card.Title>
            <hr style={{margin:"0", padding:"0"}}/>
            <div className="row align-items-center ">
              <div className="col-4 d-flex justify-content-end">
                <FontAwesomeIcon icon={faShoePrints} style={{color:"#347928"}} className="display-5" />
              </div>
              <div className="col-8 justify-content-center">
                <p style={{ color:"#88D66C", textAlign: "center", margin:"0", padding:"0"}} className="fw-bold fs-2 ">
                  {workoutValue ? `${workoutValue}` : 'No steps recorded'}
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <Doughnut
                    style={{ width: '100%', height: '80%' }} // Adjust height as needed
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

export default StepsInsight;
