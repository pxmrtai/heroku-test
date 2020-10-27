const db = require('../db')
var User = require('../models/user.model')


module.exports.requireAuth = async(req,res,next)=>{
  if(!req.signedCookies.userId){
    return res.redirect('/auth/login');
  }
  
  var user =  await User.findById({_id: req.signedCookies.userId})
  
  if(!user){
    console.log('2')
     return res.redirect('/auth/login');
  }
  
  console.log('3')
  req.user = user
  res.locals.user = user
  next()
}
