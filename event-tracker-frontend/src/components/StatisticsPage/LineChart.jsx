import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const TopCategoriesChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/statistics/top-categories")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching top categories data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: data.map((categoryData) => ({
      label: categoryData.category,
      data: categoryData.monthlyCounts,
      fill: false,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`,
      tension: 0.1,
    })),
  };

  return (
    <div>
      <h2>Top Categories Over the Year</h2>
      <div style={{ position: "relative", height: "400px" }}>
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default TopCategoriesChart;
