var shortId = require('shortid')

module.export = (req,res,next)=>{
  if(req.signedCookies.sessionId){
     res.cookie('sessisonId', shortId.generate(),{
    signed: true,
    sameSite: 'None',
    secure: true
  })
  }
  next()
}