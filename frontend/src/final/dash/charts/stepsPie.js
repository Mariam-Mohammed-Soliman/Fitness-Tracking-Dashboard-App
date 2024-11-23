import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useFetchUsersData from '../fetch/fetch';
import './charts.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklyStepsChart = ({user,goalTarget,workoutValue}) => {

  // console.log("WeeklyStepsChart",{user,goalTarget,workoutValue});

  const weeklyGoal=goalTarget*7;

  const totalSteps = workoutValue.workouts.reduce((total, workout) => {
    return total + workout.steps;
  }, 0);
  
  // console.log("totalSteps=>:", totalSteps);

  const { loading, error } = useFetchUsersData();

  const prepareChartData = (user) => {

    return {
      labels: ['Steps Taken', 'Remaining Steps'],
      datasets: [
        {
          label: 'Steps',
          data: [totalSteps,weeklyGoal  - totalSteps],
          backgroundColor: ['#fb95e5', '#f6f5f5'], 
          hoverBackgroundColor: ['#FF3EA5', '#A9A9A9'],
          borderWidth: 1,
        },
      ],
      weeklyGoal, 
      totalSteps, 
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  const chartData = user ? prepareChartData(user) : null;

  return (
    <div className="card chart d-flex align-items-center text-center justify-content-center p-1 mt-2" style={{ width: '30.5rem', height: '14rem', marginLeft: '2%', borderColor: '#e0e0e0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      {user ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true, 
                position: 'top', 
                labels: {
                  font: {
                    size: 12, 
                    family: 'Arial, sans-serif', 
                    
                  },
                  color: '#697565', 
                  padding: 6, 
                  boxWidth: 15, 
                  boxHeight: 15,
                  usePointStyle: true, 
                  pointStyle: 'circle', 
                }
              },
              title: {
                display: true,
                text: 'Weekly Steps Progress',
                font: {
                  size: 20,
                  family: 'Arial, sans-serif',
                  weight: 'bold',
                  lineHeight: 1.2,
                },
                color: '#444444',
                padding: {
                  top: 10,
                  bottom: 12,
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const value = tooltipItem.raw;
                    const total = chartData.weeklyGoal; 
                    const percentage = Math.round((value / total) * 100);
                    return ` (${percentage}%)`; 
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default WeeklyStepsChart;
