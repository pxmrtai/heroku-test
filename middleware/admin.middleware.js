const db = require('../db')
var User = require('../models/user.model')

module.exports.admin = async(req,res,next)=>{
  if(req.signedCookies.userId){
    var user = await User.find(req.signedCookies.userId)
    
    if (user.isAdmin){
     return next()
    }
  }
  
  res.redirect('/users/customer')
}