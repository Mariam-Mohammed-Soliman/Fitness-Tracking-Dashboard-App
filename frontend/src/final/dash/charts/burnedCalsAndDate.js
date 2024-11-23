import React from 'react';
import { Line } from 'react-chartjs-2';
import useFetchUsersData from '../fetch/fetch'; // Adjust the import based on your structure
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import "./charts.css"
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const BurnedCaloriesChart = ({user,workoutValue}) => {

  // console.log("BurnedCaloriesChart",{user,workoutValue});
  
  let intake=[];
  let burned=[];
  let zeroArr=Array(7).fill(0);

  workoutValue.workouts.forEach((workout, index) => {
    //  console.log("caloriesIntake",workout.caloriesIntake);
    intake.push(workout.caloriesIntake);
  });

  workoutValue.workouts.forEach((workout, index) => {
  // console.log("caloriesBurned",workout);
    burned.push(
    workout.activityInfo.reduce((acc, workout) =>
      acc + workout.caloriesBurned           
    , 0)
    );
  });

  // console.log(intake,burned);
  


  const { loading, error } = useFetchUsersData();

  const prepareChartData = (user) => {
    const labels = workoutValue?workoutValue.workouts.map((workout, index) => {
      const workoutDate=new Date(workout.createdAt);  
      return workoutDate.toISOString().slice(2, 10)
    }):Array(7).fill(0);

    // const test=labels.length > 0?labels:zeroArr;
    // console.log("test",test);
    
    // if (labels.length > 0) {
    //   console.log("yes",test);
    // }
    // else{
    //   console.log("no",test);
    // }

    return {
      labels,
      datasets: [
        {
          label: "Burned Calories",
          data: burned.length>0?burned:zeroArr,
          fill: false,
          backgroundColor: '#6a0dad', 
          borderColor: '#6a0dad',
          tension: 0.1, 
          pointRadius: 5, 
          pointBackgroundColor: '#6a0dad', 
          pointHoverBackgroundColor: '#ffcc00', 
          pointHoverBorderColor: '#ffffff', 
          pointHoverRadius: 6, 
        },
        {
          label: "Calories Intake",
          data: intake.length>0?intake:zeroArr,
          fill: false,
          backgroundColor: '#FF3EA5', // Line color for calories intake
          borderColor: '#FF3EA5',
          tension: 0.1, // Smooth the line
          pointRadius: 5, // Size of points
          pointBackgroundColor: '#FF3EA5', // Default point color
          pointHoverBackgroundColor: '#ffcc00', // Hover color for points
          pointHoverBorderColor: '#ffffff', // Border color on hover
          pointHoverRadius: 6, // Increase size on hover
        },
      ],
    };
  };

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  // Find user by ID

  return (
    <div className='card chart d-flex align-items-center text-center justify-content-center p-1 mt-2' 
         style={{
           width: "43rem", 
           height: "15rem", 
           marginLeft: "3.5%", 
          
           borderColor: "#e0e0e0", 
           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
           overflow: 'hidden' 
         }}>
      {user ? (
        <Line
          data={prepareChartData()} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true, 
                position: 'top', 
                labels: {
                  font: {
                    size: 13, 
                    family: 'Arial, sans-serif', 
                    weight: 'bold', 
                  },
                  color: '#697565', 
                  padding: 20, 
                  boxWidth: 19, 
                  boxHeight: 15,
                  usePointStyle: true, 
                  pointStyle: 'circle', 
                }
              },
              title: {
                display: true,
                text: 'Burned Calories vs Calories Intake Over Time',
                font: {
                  size: 20, // Font size of the title
                  family: 'Arial, sans-serif', // Font family of the title
                  weight: 'bold', // Font weight of the title
                },
                color: '#444444', // Font color of the title
                padding: {
                  top: 8,
                  bottom: 2,
                },
              },
              // If using datalabels plugin, ensure it's configured to not display
              datalabels: {
                display: false, // Prevent datalabels from being shown
              },
            },
            scales: {
              x: {
                title: {
                  display: false,
                  text: 'Date',
                  font: {
                    size: 14, // Font size for x-axis title
                    weight: 'bold', // Font weight for x-axis title
                    family: 'Arial, sans-serif', // Font family for x-axis title
                    color: '#333', // Font color for x-axis title
                  },
                },
                ticks: {
                  autoSkip: true, // Automatically skip ticks to avoid clutter
                  maxTicksLimit: 10, // Limit the number of ticks displayed
                  color: '#333', // Color of tick labels
                  font: {
                    size: 12, // Font size for tick labels
                    family: 'Arial, sans-serif', // Font family for tick labels
                  },
                },
                grid: {
                  color: '#e0e0e0', // Color of grid lines
                  lineWidth: 1, // Width of grid lines
                },
              },
              y: {
                title: {
                  display: false,
                  text: 'Calories',
                  font: {
                    size: 14, // Font size for y-axis title
                    weight: 'bold', // Font weight for y-axis title
                    family: 'Arial, sans-serif', // Font family for y-axis title
                    color: '#333', // Font color for y-axis title
                  },
                },
                ticks: {
                  color: '#333', // Color of tick labels
                  font: {
                    size: 12, // Font size for tick labels
                    family: 'Arial, sans-serif', // Font family for tick labels
                  },
                },
                grid: {
                  color: '#e0e0e0', // Color of grid lines
                  lineWidth: 1, // Width of grid lines
                },
              },
            },
            interaction: {
              mode: 'nearest', // Ensures hover is based on nearest point
              intersect: true,  // Require hover to intersect with a point
            },
          }} 
          style={{ width: '100%', height: '100%', padding:"1%" }} 
        />
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default BurnedCaloriesChart;
