const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, enum: ["Fiction", "Science", "Comic"] },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = { BookModel };
//   title: "",
//     author: "",
//     genre: "",
//     description: "",
//     price: "",
