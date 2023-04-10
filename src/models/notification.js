const mongoose = require("mongoose");

const { Schema } = mongoose;

// const action = mongoose.model("actions");
// const staff = mongoose.model("staffs");
// const event = mongoose.model("events");

const notificationSchema = new Schema(
  {
    action: {
      type: Object,
    },
    staff: {
      type: [Object],
    },
    event: {
      type: Object,
    },
  },
  { versionKey: false },
  { collection: "notifications" }
);

module.exports = mongoose.model("notifications", notificationSchema);
