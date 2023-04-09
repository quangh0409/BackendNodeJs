const mongoose = require("mongoose");

const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: "name  can't be blank",
    },
    numberPhone:{
        type: String,
        required: " numberPhone can't be blank"
    },
    address:{
        type: String,
        required: false
    },
    workingTimeDefault: {

    }
  },
  { versionKey: false },
  { collection: "staffs" }
);

module.exports = mongoose.model("staffs", staffSchema);
