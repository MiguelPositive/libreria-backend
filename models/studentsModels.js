const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  name: {
    type: String,
    trim: false,
  },

  semester: {
    type: Number,
    trim: true,
  },

  academicProgram: {
    type: String,
    trim: false,
  },
});

const studentsModel = mongoose.model("students", studentsSchema);

module.exports = { studentsModel };
