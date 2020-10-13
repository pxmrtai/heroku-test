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
// ok 
// dạ, dạ, 
// thì mình sẽ add data theo kiểu như này {id: sessionId, cart: { 'bookid': 2, 'bookid2': 5,}} đấy thì trong db.json nó mình sẽ đẩy vào cho ra data kiểu như vậy
// xong khi mình đăng nhập thì, vẫn dùng cái sessionId để show ra trong cart có gì 
// việc đăng nhập chỉ mục đích là tạo ra cookieId để khi mình tạo transaction ấy mình lưu {id: transactionId, userId: 'idFromCookie', bookId:'bookid'}
// hmm em vẫn chưa tưởng tượng ra code sẽ ntn ạ :( hay là em cứ code ạ.. có gì sẽ hỏi sau ạ? 
// ok bạn, dạ 
// trước mắt bạn cứ code cái cart đi đã