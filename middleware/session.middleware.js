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

// thì mình sẽ add data theo kiểu như này {id: sessionId, cart: { 'bookid': 2, 'bookid2': 5,}} đấy thì trong db.json nó mình sẽ đẩy vào cho ra data kiểu như vậy
// xong khi mình đăng nhập thì, vẫn dùng cái sessionId để show ra trong cart có gì 
// việc đăng nhập chỉ mục đích là tạo ra cookieId để khi mình tạo transaction ấy mình lưu {id: transactionId, userId: 'idFromCookie', bookId:'bookid'}
