import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarGraphContainer = ({ schoolData }) => {
  // Extract categorical features with improved labels
  const features = [
    { key: "Library_Available", label: "Library Available" },
    { key: "Separate_Room_for_HM", label: "Room for HM" },
    { key: "Boundary_Wall", label: "Boundary Wall" },
    { key: "Drinking_Water_Available", label: "Drinking Water" },
    { key: "Playground_Available", label: "Playground" },
    { key: "Electricity_Availability", label: "Electricity Availability" },
    { key: "CWSN", label: "CWSN" },
  ];

  // Count occurrences of true and false for each feature
  const featureCounts = features.map(({ key, label }) => {
    const trueCount = schoolData.filter(
      (school) => school[key] === true
    ).length;
    const falseCount = schoolData.filter(
      (school) => school[key] === false
    ).length;
    return { feature: label, trueCount, falseCount };
  });

  // Prepare data for the bar chart
  const data = {
    labels: featureCounts.map((item) => item.feature),
    datasets: [
      {
        label: "True",
        data: featureCounts.map((item) => item.trueCount),
        backgroundColor: "rgba(75, 192, 192, 0.8)", // Green for "true"
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "False",
        data: featureCounts.map((item) => item.falseCount),
        backgroundColor: "rgba(255, 99, 132, 0.8)", // Red for "false"
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Enforces aspect ratio
    aspectRatio: 2, // Adjusts the width-to-height ratio of the chart
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Categorical Feature Overview",
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Features",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 12,
            weight: "500", // Semi-bold font for x-axis labels
          },
          color: "#333",
          maxRotation: 0, // Prevents label rotation
          autoSkip: false, // Ensures all labels are displayed
        },
        grid: {
          drawOnChartArea: false, // Removes vertical grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 12,
            weight: "600", // Semi-bold font for y-axis labels
          },
          beginAtZero: true,
        },
        grid: {
          drawBorder: false, // Removes border grid lines
        },
      },
    },
  };

  return (
    <div style={styles.graphContainer}>
      <h1 className="text-center font-semibold">
        Categorical Feature Overview
      </h1>
      <Bar data={data} options={options} />
    </div>
  );
};

const styles = {
  graphContainer: {
    padding: "16px",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ebf2f2",
    maxWidth: "900px",
    margin: "20px auto",
    border: "1px solid #f0f0f0",
    width: "100%", // Ensures it spans the parent container but within maxWidth
    height: "auto", // Ensures the container does not stretch
  },
};

export default BarGraphContainer;
