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
  { minDegree: 151, maxDegree: 180, value: 3 },
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

var textColors = [
  "#FF0000", // Bright red
  "#FFFFFF", // White
  "#FF0000", // Bright red
  "#FFFFFF", // White
  "#FF0000", // Bright red
  "#FFFFFF", // White
  "#FF0000", // Bright red
  "#FFFFFF", // White
  "#FF0000", // Bright red
  "#FFFFFF", // White
  "#FF0000", // Bright red
  "#FFFFFF"  // White
];


/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["RM8", "RM3", "SPIN", "RM1", "RM38", "RM99", "RM50", "RM3", "RM18", "RM3", "RM50", "RM5"],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 1},
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90, // Set rotation to 0 to keep labels horizontal
        anchor: 'center', // Position the labels at the center of each section
        align: 'end', // Align the labels to the center of each section
        color: textColors,
        textShadowColor: "#ffd700",
        textShadowBlur: 10,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: {
          // family: 'PT Serif, serif',
          family: 'Roboto',
          size: 13,
          weight: 'bold',
          style: 'italic',
        },
      },
    },
  },
});

/* --------------- Display Value Based On The Angle --------------------- */
// const generateValue = (angleValue) => {
//   for (let i of spinValues) {
//     if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
//       // text.innerHTML = `<p>Congratulations, You Have Won RM${i.value} ! </p>`;
//       spinBtn.disabled = false;
//       break;
//     }
//   }
// };

const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      // Create a new element for the pop-up animation
      const popup = document.createElement("div");
      popup.classList.add("popup");
      popup.innerHTML = `
        <p>Congratulations, You Have Won RM${i.value}!</p>
        <button class="popup-button">Claim Prize</button>
      `;

      // Add an event listener to the "Claim Prize" button
      const claimButton = popup.querySelector(".popup-button");
      claimButton.addEventListener("click", () => {
        // Replace 'your-whatsapp-number' with your actual WhatsApp number
        const whatsappNumber = '+60182774276';
        const message = `Amoi ! Nk Claim ID Ong Ong Kuat Muntah Jackpot.`;
        // Congratulations! I won RM${i.value}!`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Open the WhatsApp link in a new window/tab
        window.open(whatsappLink, '_blank');
      });
      
      // Append the pop-up element to the document body
      document.body.appendChild(popup);

      // Apply a fade-in animation to the pop-up element
      setTimeout(() => {
        popup.classList.add("show");
      }, 100);

      // Enable the spin button after a delay
      // setTimeout(() => {
      //   spinBtn.disabled = false;
      // }, 1500);

      break;
    }
  }
};


/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Ong Ong Boss!</p>`;
  // let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  // let randomDegree = Math.random() < 0.5 ? 39 : 230;
  let randomDegree = Math.random() < 0.33 ? 39 : Math.random() < 0.67 ? 165 : 230;

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
  }, 20);
});
/* --------------- End Spin Wheel  --------------------- */

