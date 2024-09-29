const mongoose = require("mongoose");
const validator = require("validator");

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email ID already present"],
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid Error");
      }
    },
  },

  title: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  approve: { type: Number, default: 0 }
});

const Student = new mongoose.model("Developer", developerSchema);

module.exports = Student;
