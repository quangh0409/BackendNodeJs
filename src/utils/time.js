const mongoose = require("mongoose");

class Time extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, "Time");
  }

  cast(val) {
    if (val === null) {
      return val;
    }

    // Kiểm tra xem val có phải là định dạng HH:MM:SS hay không
    const timeRegex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    const match = timeRegex.exec(val);

    if (match === null) {
      throw new Error(`'${val}' is not a valid time in format HH:MM:SS`);
    }

    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);

    if (hours < 0 || hours > 23) {
      throw new Error(`'${hours}' is not a valid hour value`);
    }

    if (minutes < 0 || minutes > 59) {
      throw new Error(`'${minutes}' is not a valid minute value`);
    }

    if (seconds < 0 || seconds > 59) {
      throw new Error(`'${seconds}' is not a valid second value`);
    }

    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));

    return date.toLocaleTimeString("en-US", { hour12: false });
  }

  // Hàm so sánh 2 đối tượng Time
  compare(otherTime) {
    if (this.hours < otherTime.hours) {
      return -1;
    } else if (this.hours > otherTime.hours) {
      return 1;
    } else {
      if (this.minutes < otherTime.minutes) {
        return -1;
      } else if (this.minutes > otherTime.minutes) {
        return 1;
      } else {
        if (this.seconds < otherTime.seconds) {
          return -1;
        } else if (this.seconds > otherTime.seconds) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  }
}

mongoose.Schema.Types.Time = Time;

module.exports = Time;
