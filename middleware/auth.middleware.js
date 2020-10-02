const db = require('../db')


module.exports.requireAuth = (req,res,next)=>{
  if(!req.signedCookies.userId){
    res.redirect('/auth/login');
    return
  }
  var user = db.get('user').find({id: req.signedCookies.userId}).value()
  
  if(!user){
     res.redirect('/auth/login');
    return
  }
  
  req.user=user
  res.locals.user = user
  next()
}
