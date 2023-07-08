/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
Chart.defaults.font.family = "Verdana";
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 8 },
  { minDegree: 31, maxDegree: 60, value: 3 },
  { minDegree: 0, maxDegree: 30, value: "SPIN" },
  { minDegree: 331, maxDegree: 360, value: 1 },
  { minDegree: 301, maxDegree: 330, value: 38 },
  { minDegree: 271, maxDegree: 300, value: 99 },
  { minDegree: 241, maxDegree: 270, value: 50 },
  { minDegree: 211, maxDegree: 240, value: 3 },
  { minDegree: 181, maxDegree: 210, value: 18 },
  { minDegree: 151, maxDegree: 180, value: 1 },
  { minDegree: 121, maxDegree: 150, value: 50 },
  { minDegree: 91, maxDegree: 120, value: 5 },
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "#ECE0D9", // Dirty white
  "#FF0000", // Bright red
  "#ECE0D9", // Dirty white
  "#FF0000", // Bright red
  "#ECE0D9", // Dirty white
  "#FF0000", // Bright red
  "#ECE0D9", // Dirty white
  "#FF0000", // Bright red
  "#ECE0D9", // Dirty white
  "#FF0000", // Bright red
  "#ECE0D9", // Dirty white
  "#FF0000", // Bright red
  // ...
];

/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["RM8", "RM3", "SPIN", "RM1", "RM38", "RM99", "RM50", "RM3", "RM18", "RM1", "RM50", "RM5"],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 1 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90, // Set rotation to 0 to keep labels horizontal
        anchor: 'center', // Position the labels at the center of each section
        align: 'end', // Align the labels to the center of each section
        color: "#000000",
        textShadowColor: "#000000",
        textShadowBlur: 10,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: {
          family: 'PT Serif, serif',
          size: 14,
          weight: 'normal',
          style: 'italic',
        },
      },
    },
  },
});

/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won RM${i.value} ! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */