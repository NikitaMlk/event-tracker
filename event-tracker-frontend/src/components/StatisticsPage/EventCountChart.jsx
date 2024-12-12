import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const EventCountChart = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/events/statistics/events"
        );
        const fetchedData = response.data;

        const months = Array.from({ length: 12 }, (_, i) => ({
          month: i + 1,
          count: 0,
        }));

        fetchedData.forEach((item) => {
          const monthIndex = item.month - 1;
          if (months[monthIndex]) {
            months[monthIndex].count = item.count;
          }
        });

        setStatistics(months);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

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
    datasets: [
      {
        label: "Event Count",
        data: statistics.map((item) => item.count),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: "relative", height: "400px" }}>
      <h2>Event Amount</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default EventCountChart;
