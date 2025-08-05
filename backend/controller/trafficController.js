// controller/trafficController.js

let directions = ['North', 'East', 'South', 'West'];
let currentIndex = 0;

let currentLight = {
  direction: directions[currentIndex],
  color: 'green',
  secondsLeft: 55
};

setInterval(() => {
  if (currentLight.color === 'green' && currentLight.secondsLeft === 5) {
    currentLight.color = 'yellow';
    currentLight.secondsLeft = 5;
  } else if (currentLight.color === 'yellow' && currentLight.secondsLeft === 1) {
    currentIndex = (currentIndex + 1) % 4;
    currentLight = {
      direction: directions[currentIndex],
      color: 'green',
      secondsLeft: 55
    };
  } else {
    currentLight.secondsLeft -= 1;
  }
}, 1000);

const getTrafficStatus = (req, res) => {
  res.json(currentLight);
};

module.exports = { getTrafficStatus };
