const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: String,
  copies: { type: Number, default: 1 }
});

module.exports = mongoose.model("Book", bookSchema);
