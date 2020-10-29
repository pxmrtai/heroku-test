var mongoose = require('mongoose')
var sessionSchema = new mongoose.Schema({
    cart:{}
  
})
var Session = mongoose.model('sessions',sessionSchema)
module.exports = Session