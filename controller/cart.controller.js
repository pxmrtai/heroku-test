var db = require('../db')
var Session = require('../models/session.model')


module.exports.addToCart=async(req,res,next)=>{
  var cartId = req.params.cartId
  var sessionId = req.signedCookies.sessionId

  if(!sessionId){
    res.redirect('/book')
  }
var count =  await Session.findById(sessionId)
console.log(count)

   //  db.get('sessions')
   // .find({id: sessionId})
   // .get('cart.'+ cartId, 0)
   // .value()
 db.get('sessions')
   .find({id: sessionId})
   .set('cart.'+ cartId, count+1)
   .write()
  
if(req.signedCookies.userId){
 var user= db.get('user').find({id: req.signedCookies.userId}).value()
 console.log(user)
  db.get('sessions')
    .find({id:sessionId})
    .assign({userId: user.id})
    .write()
}

  res.redirect('/book')
}