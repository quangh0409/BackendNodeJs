const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: "name  cannot be blank",
    },
    camera: {
      type: Object,
      required: "camera cannot be blank",
    },
    createdTime: {
      type: String,
    }
  },
  { versionKey: false },
  { collection: "events" }
);

module.exports = mongoose.model("events", eventSchema);
