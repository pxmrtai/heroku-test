const db = require('../db')
var mongoose = require('mongoose')
var User = require('../models/user.model')


module.exports.requireAuth = async(req,res,next)=>{
  if(!req.signedCookies.userId){
    return res.redirect('/auth/login');
  }
  var user =  await User.findOne({_id: req.signedCookies.userId})
  console.log('middleware ' + req.signedCookies.userId)

  if(!user){
    console.log('k co user')
     return res.redirect('/auth/login');
  }
  
  console.log('3')
  req.user = user
  res.locals.user = user
  next()
}
