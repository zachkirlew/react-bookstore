var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  image: String,
  price: Number
});

var Book = mongoose.model('Book',bookSchema);
module.exports = Book;
