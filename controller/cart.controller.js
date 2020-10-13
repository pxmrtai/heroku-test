var db = require('../db')


module.exports.addToCart=(req,res,next)=>{
  var cartId = req.params.cartId
  var sessionId = req.signedCookies.sessionId
  
  if(!sessionId){
    res.redirect('/book')
  }
 
}