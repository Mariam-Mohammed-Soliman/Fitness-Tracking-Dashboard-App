import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleWater } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from 'react-bootstrap/Card';
import useFetchUsersData from '../fetch/fetch';
import './insight.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function WaterInsight({userId,goalTarget,workoutValue}) {

  console.log("WaterInsight",{userId,goalTarget,workoutValue});

  
  // Prepare doughnut data
  const doughnutData = {
    labels: ['Water Intake', 'Remaining Water'],
    datasets: [
      {
        label: 'Water Intake',
        data: [workoutValue, goalTarget - workoutValue],
        backgroundColor: ['#2CD3E1', '#D3D3D3'], // Customize your colors
        hoverBackgroundColor: ['#2BBBD1', '#A9A9A9'],
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
            return `${value}L ,${percentage}%`; // Show value and percentage
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
            height: '90%', 
            borderColor:"#e0e0e0", 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
          }} 
          className='insight'
        >
          <Card.Body>
            <Card.Title style={{textAlign:"center", color:"#444444"}}>Today's Water</Card.Title>
            <hr style={{margin:"0", padding:"0"}}/>
            <div className="row align-items-center">
              <div className="col-4 d-flex justify-content-end">
                <FontAwesomeIcon icon={faBottleWater} style={{color:"#3795BD"}} className="display-3" />
              </div>
              <div className="col-8 justify-content-center" >
                <p style={{ color:"#2CD3E1", textAlign: "center" }} className="fw-bold fs-2 m-0 mb-1  mt-1 p-0 ">
                  {workoutValue ? `${workoutValue} L` : 'No water intake'}
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <Doughnut
                    style={{ width: '100%', height: '80%' }} 
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

export default WaterInsight;
