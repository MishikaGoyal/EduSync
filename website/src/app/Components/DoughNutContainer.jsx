import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
//import { new_school_data } from '../lib/school_dash_data';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughNutContainer = ({schoolData}) => {
    let oddSchoolNum = 0;
    let standSchoolNum = 0;

    schoolData.forEach((school) => {
        if (school.Result === 'ODD') {
            oddSchoolNum++;
        } else {
            standSchoolNum++;
        }
    });

    const data = {
        labels: ['Odd School', 'Standard School'],
        datasets: [
            {
                label: 'School Structures',
                data: [oddSchoolNum, standSchoolNum],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', // Red for odd schools
                    'rgba(75, 192, 192, 0.8)', // Teal for standard schools
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
                hoverOffset: 10, // Adds hover expansion effect
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                        weight: '600', // Semi-bold font for the legend
                    },
                    padding: 15,
                },
            },
            title: {
                display: false,
                text: 'School Structure Distribution',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                padding: 20,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const value = dataset.data[tooltipItem.dataIndex];
                        const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div style={styles.graphContainer}>
            <h1 className="text-center font-bold text-lg mb-4">School Structure Distribution</h1>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

const styles = {
    graphContainer: {
        padding: '24px',
        borderRadius: '20px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9fafc',
        width: '500px',
        height: '500px',
        margin: '20px auto',
        border: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default DoughNutContainer;
