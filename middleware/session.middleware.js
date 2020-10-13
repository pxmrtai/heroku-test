var shortid = require('shortid')

module.exports = function(req,res,next){
  if(req.signedCookies.sessionId){
     res.cookie('sessisonId', shortid.generate(),{
    signed: true
  });
  }
  
  next()
  
}
