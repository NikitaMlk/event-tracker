import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const CategoryDistributionChart = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events/statistics/categories")
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching category distribution:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading category distribution...</p>;
  }

  const chartData = {
    labels: categories.map(item => item.category),
    datasets: [
      {
        label: 'Event Distribution by Category',
        data: categories.map(item => item.count),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ position: 'relative', height: '400px', width: '400px' }}>
      <h2>Event Category Distribution</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CategoryDistributionChart;
