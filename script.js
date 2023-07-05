/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, value: 100 },
  { minDegree: 31, maxDegree: 60, value: 200 },
  { minDegree: 0, maxDegree: 30, value: 300 },
  { minDegree: 331, maxDegree: 360, value: 400 },
  { minDegree: 301, maxDegree: 330, value: 500 },
  { minDegree: 271, maxDegree: 300, value: 600 },
  { minDegree: 241, maxDegree: 270, value: 700 },
  { minDegree: 211, maxDegree: 240, value: 800 },
  { minDegree: 181, maxDegree: 210, value: 900 },
  { minDegree: 151, maxDegree: 180, value: 1000 },
  { minDegree: 121, maxDegree: 150, value: 1100 },
  { minDegree: 91, maxDegree: 120, value: 1200 },
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
    labels: ["$8", "$3", "SPIN", "$1", "$38", "$138", "$0.5", "$3", "$18", "$1", "$0.5", "$5"],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 0, // Set rotation to 0 to keep labels horizontal
        anchor: 'center', // Position the labels at the center of each section
        align: 'center', // Align the labels to the center of each section
        color: "#000000",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: {
           size: 23, 
           weight: 'bold',
          }, // Decrease font size for better fit=
      },
    },
  },
});

/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won $${i.value} ! </p>`;
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