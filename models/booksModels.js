const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: {
    type: String,
    trim: false,
  },

  author: {
    type: String,
    trim: false,
  },

  category: {
    type: String,
    trim: false,
  },

  available: {
    type: Boolean,
  },

  infoStudent: {
    type: Object,
  },

  departureDate: {
    type: String,
  },
});

const booksModel = mongoose.model("books", booksSchema);

module.exports = { booksModel };
