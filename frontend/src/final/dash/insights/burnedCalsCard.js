import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from 'react-bootstrap/Card';
import useFetchUsersData from '../fetch/fetch';
import './insight.css';

ChartJS.register(ArcElement, Tooltip, Legend); // Removed ChartDataLabels

function BurnedCalsInsight({userId,goalTarget,workoutValue}) {

    console.log("BurnedCalsInsight",{userId,goalTarget,workoutValue});

  
  const doughnutData = {
    labels: ['Calories Burned', 'Remaining Calories'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [workoutValue, goalTarget - workoutValue],
        backgroundColor: ['#F08080', '#D3D3D3'], // Customized colors
        hoverBackgroundColor: ['#C70039', '#A9A9A9'],
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
            height: '90%', 
            borderColor: '#e0e0e0',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          }}
          className="insight mb-3"
        >
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', color: '#444444', whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden"}}>
              Today's burned calories
            </Card.Title>
            <hr style={{margin:"0", padding:"0"}}/>
            <div className="row align-items-center">
              <div className="col-4 d-flex justify-content-end">
                <FontAwesomeIcon icon={faFire} style={{ color: '#B22222' }} className="display-4" />
              </div>
              <div className="col-8">
                <p style={{ color: '#FF0000', whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden" }} className="fw-bold fs-2 mt-1 mb-1">
                  {workoutValue ? `${workoutValue} Kcal` : 'No steps recorded'}
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

export default BurnedCalsInsight;
