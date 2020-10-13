var db = require('../db')


module.exports.addToCart=(req,res,next)=>{
  var cartId = req.params.cartId
  var sessionId = req.signedCookies.sessionId
  
  if(!sessionId){
    res.redirect('/book')
  }
var count =  db.get('sessions')
   .find({id: sessionId})
   .get('cart.'+ cartId, 0)
   .value()
 db.get('sessions')
   .find({id: sessionId})
   .set('cart.'+ cartId, count+1)
   .write()
  

  res.redirect('/book')
}