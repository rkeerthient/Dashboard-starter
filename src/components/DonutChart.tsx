import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Desktop", "Mobile", "Tablet", "Unknown"],
  datasets: [
    {
      data: [68, 22, 9, 1],
      backgroundColor: ["#188acc", "#22d2be", "#fec030", "#f3316a"],

      borderWidth: 1,
    },
  ],
};

const DonutChart = () => {
  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Device users use to find my website",
          },
          legend: {
            position: "bottom",

            labels: {
              font: {
                size: 8,
              },
              usePointStyle: true,
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                return datasets[0].data.map((data, i) => ({
                  text: `${chart.data.labels[i]} ${data} - ${data}%`,
                  fillStyle: datasets[0].backgroundColor[i],
                  index: i,
                }));
              },
            },
          },
        },
      }}
      className="!h-[400px] !w-auto"
    />
  );
};
export default DonutChart;
