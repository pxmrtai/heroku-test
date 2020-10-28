var mongoose = require('mongoose')
var sessionSchema = new mongoose.Schema({
    id:String
  
})
var Session = mongoose.model('sessions',sessionSchema)
module.exports = Session