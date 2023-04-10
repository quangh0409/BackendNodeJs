const mongoose = require("mongoose");
const Time = require("../utils/time");

const { Schema } = mongoose;

const workingTimeDefault = new Object({
  startTime: String,
  endTime: String,
});

const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: "name can't be blank",
    },
    numberPhone: {
      type: String,
      required: " numberPhone can't be blank",
    },
    address: {
      type: String,
      required: false,
    },
    workingTimeDefault: workingTimeDefault,
    notification: {
      type: [String],
    },
  },
  { versionKey: false },
  { collection: "staffs" }
);

module.exports = mongoose.model("staffs", staffSchema);
