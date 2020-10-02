const db = require('../db')


module.exports.requireAuth = (req,res,next)=>{
  if(!req.signedCookies.userId){
    console.log('1')
    return res.redirect('/auth/login');
  }
  
  var user = db.get('user').find({id: req.signedCookies.userId}).value()
  
  if(!user){
    console.log('2')
     return res.redirect('/auth/login');
  }
  
  console.log('3')
  req.user = user
  res.locals.user = user
  next()
}
