import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import * as React from "react";
import { Doughnut, Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

const SampleChart = () => {
  const [chartData, setChartData] = React.useState({
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#4e9d3a", "#ecf0f1"],
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="chart-container  ">
      <Doughnut
        data={chartData}
        className="!h-[200px] mx-auto md:!h-[500px] !w-auto"
        options={{
          cutout: "95%",
          circumference: 280,
          rotation: 220,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Completion percentage",
            },
          },
        }}
        plugins={[
          {
            id: "numberId",
            beforeDraw: function (chart) {
              var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
              ctx.restore();
              var fontSize = (height / 160).toFixed(2);
              ctx.font = fontSize + "em sans-serif";
              ctx.textBaseline = "top";
              var text = "75%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
              ctx.fillText(text, textX, textY);
              ctx.save();
            },
          },
        ]}
      />
    </div>
  );
};

export default SampleChart;
