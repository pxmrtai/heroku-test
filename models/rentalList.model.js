var mongoose = require('mongoose')
var rentalSchema = new mongoose.Schema({
  bookId: String,
  email: String,
  avatar: String,
  isComplete: Boolean
  
})
var RentalList = mongoose.model('rentallists',rentalSchema)
module.exports = RentalList;