const mongoose = require("mongoose");
const Time = require("../utils/time");

const { Schema } = mongoose;

// const referenceTime = new Schema(
//   {
//     startTime: {
//       type: Time,
//     },
//     endTime: {
//       type: Time,
//     },
//   },
//   { _id: false }
// );

const referenceSpace = new Schema(
  {
    location: {
      type: [String],
    },
  },
  { _id: false }
);

const ruleSchema = new Schema(
  {
    name: {
      type: String,
    },
    referenceTime: {
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },

    referenceSpace: {
      type: referenceSpace,
    },

    action: {
      type: Object,
    },
  },
  { versionKey: false },
  {
    timestamps: true,
  },
  { collection: "rules" },
  { _id: false }
);

module.exports = mongoose.model("rules", ruleSchema);
