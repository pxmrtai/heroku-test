var shortId = require('shortid')
const db = require('../db')


module.exports = (req,res,next)=>{
  if(!req.signedCookies.sessionId){
    var sessionId = shortId.generate()
     res.cookie('sessisonId', sessionId,{
    signed: true
  })
   var a = db.get('sessions').push( {
      id : sessionId
    }).write()
  }
  console.log(a)
  
  next()
  
}
