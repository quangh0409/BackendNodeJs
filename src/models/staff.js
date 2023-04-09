const mongoose = require("mongoose");

const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: "name  cannot be blank",
    }
  },
  { versionKey: false },
  { collection: "staffs" }
);

module.exports = mongoose.model("staffs", staffSchema);
