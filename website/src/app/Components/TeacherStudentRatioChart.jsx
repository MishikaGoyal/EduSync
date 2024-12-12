import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components, including ArcElement for Bar chart rendering
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const processData = ({ schoolData }) => {
  const ranges = [
    { min: 0, max: 10 },
    { min: 10, max: 20 },
    { min: 20, max: 30 },
    { min: 30, max: 40 },
    { min: 40, max: 50 },
    { min: 50, max: 60 },
  ];

  const bucketCounts = Array(ranges.length).fill(0);

  schoolData.forEach((school) => {
    const students = parseInt(school.Total_Students, 10) || 0;
    const teachers = parseInt(school.Total_Teachers, 10) || 0;
    const ratio = teachers === 0 ? 0 : Math.round(students / teachers);

    ranges.forEach((range, index) => {
      if (ratio >= range.min && ratio < range.max) {
        bucketCounts[index]++;
      }
    });
  });

  return {
    labels: ranges.map((range) => `${range.min}-${range.max}`), // Keep labels in order
    data: bucketCounts, // Keep data in original order
  };
};

const TeacherStudentRatioChart = ({ schoolData }) => {
  const { labels, data } = processData({ schoolData });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Schools",
        data,
        backgroundColor: "rgba(19, 179, 232, 0.8)",
        borderColor: "rgba(19, 179, 232, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y", // Horizontal bar chart
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Number of Schools",
          font:{
            size : 14,
            weight:'bold',
          },
          padding: 2
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: "Student-to-Teacher Ratio",
          font: {
            size: 14,
            weight:'bold'
          },
          padding:6
        },
        reverse: true, // Reverse the y-axis to have 0-10 at the bottom
      },
    },
  };

  return (
    <div style={styles.chartContainer}>
      <h2 className="text-center font-semibold">Student-to-Teacher Ratio Distribution</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

const styles = {
  chartContainer: {
    padding: "16px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f7f7f7",
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
  },
};

export default TeacherStudentRatioChart;