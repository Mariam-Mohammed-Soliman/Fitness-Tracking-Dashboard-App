import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import useFetchUsersData from '../fetch/fetch';
import './charts.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const WeeklyWaterChart = ({user,goalTarget,workoutValue}) => {

  // console.log("WeeklyWaterChart",{user,goalTarget,workoutValue});

  const waterIntakeData = workoutValue.map((workout) => {
    return workout.waterIntake;
  }, 0);

  // console.log(waterIntakeData);
  

  const {  loading, error } = useFetchUsersData();

  const prepareChartData = (user) => {
    const hydrationGoalData = Array(7).fill(goalTarget);

    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 
      datasets: [
        {
          label: 'Water Intake',
          data: waterIntakeData,
          backgroundColor: '#FF3EA5',
        },
        {
          label: 'Hydration Goal',
          data: hydrationGoalData,
          backgroundColor: '#fbe1f0',
        },
      ],
      hydrationGoalData, 
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const chartData = user ? prepareChartData(user) : null;
  return (
    <div className="card chart d-flex align-items-center text-center justify-content-center p-1 mt-2" style={{ width: '30rem', height: '14rem', marginLeft: '3.5%', borderColor: '#e0e0e0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      {user && chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true, 
              },
              y: {
                stacked: true, 
              },
            },
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
                },
              },
              title: {
                display: true,
                text: 'Weekly Water Intake vs Hydration Goal',
                font: {
                  size: 17,
                  family: 'Arial, sans-serif',
                  weight: 'bold',
                  lineHeight: 1.2,
                },
                color: '#444444',
                padding: {
                  top: 5,
                  bottom: 5,
                },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const value = tooltipItem.raw;
                    const total = tooltipItem.datasetIndex === 0 ? chartData.hydrationGoalData[tooltipItem.dataIndex] : chartData.hydrationGoalData[tooltipItem.dataIndex];
                    const percentage = Math.round((value / total) * 100);
                    return `${value} L (${percentage}%)`;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>User not found or chart data is invalid.</p>
      )}
    </div>
  );
};

export default WeeklyWaterChart;
