var mongoose = require('mongoose')
var rentalSchema = new mongoose.Schema({
  bookId: String,
  email: String,
  isComplete: Boolean
  
})
var RentalList = mongoose.model('rentalList',rentalSchema)
module.exports = RentalList;