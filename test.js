const Time = require("./src/utils/time");

const startTime = new Time('10:30:00');
const endTime = new Time('10:00:00');

if (startTime.compare(endTime) < 0) {
  console.log(startTime.compare(endTime));
} else if (startTime.compare(endTime) > 0) {
  console.log(!!startTime.compare(endTime));
} else {
  console.log(startTime.compare(endTime));
}