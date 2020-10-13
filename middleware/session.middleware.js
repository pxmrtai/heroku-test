var shortId = require('shortid')
const db = require('../db')


module.exports = (req,res,next)=>{
  if(!req.signedCookies.sessionId){
    var sessionId = shortId.generate()
     res.cookie('sessionId', sessionId,{
    signed: true,
    sameSite: 'None',
    secure: true
  })
    db.get('sessions').push( {
      id : sessionId
    }).write()
  }
  
  next();
}
// dạ!! có ạ.. dạ.. em xem video anh thịnh về add rồi ạ.. cái đấy em hiểu ạ.
// bạn có ở đây không 
// đầu tiên bạn là 1 cái route add to cart cứ mỗi lần nhấn nút addToCart 
