const db = require('../db')
module.exports.admin = (req,res,next)=>{
  if(req.signedCookies.userId){
    var user = db.get('user').find({id: req.signedCookies.userId}).value()
    console.log(user)
  
    if (!user.isAdmin){
    res.redirect('/')
      return
    }
  }
  
  next()
}