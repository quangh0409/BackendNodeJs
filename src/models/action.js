const mongoose = require("mongoose");

const { Schema } = mongoose;

const actionSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false },
  { collection: "actions" }
);

module.exports = mongoose.model("actions", actionSchema);
