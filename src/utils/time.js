const mongoose = require('mongoose');

class Time {
  constructor(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map((str) => parseInt(str));

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      throw new Error(`Invalid time string: ${timeString}`);
    }

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  getHours() {
    return this.hours;
  }

  getMinutes() {
    return this.minutes;
  }

  getSeconds() {
    return this.seconds;
  }

  compare(otherTime) {
    if (!(otherTime instanceof Time)) {
      throw new Error(`Cannot compare non-Time object with Time object`);
    }

    if (this.hours !== otherTime.hours) {
      return this.hours - otherTime.hours;
    }

    if (this.minutes !== otherTime.minutes) {
      return this.minutes - otherTime.minutes;
    }

    return this.seconds - otherTime.seconds;
  }

  static schemaType() {
    class TimeSchemaType extends mongoose.SchemaType {
      constructor(key, options) {
        super(key, options, 'Time');
      }

      cast(val) {
        if (val instanceof Time) {
          return val;
        }

        return new Time(val);
      }
    }

    mongoose.Schema.Types.Time = TimeSchemaType;

    return Time;
  }
}

module.exports = Time.schemaType();
