var shortId = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
  console.log(req.signedCookies)
  if (!req.signedCookies.sessionId) {
    var sessionId = shortId.generate();
    res.cookie("sessionId", sessionId, { 
      signed: true,
      sameSite: 'None',
      secure: true
    });
    db.get("sessions")
      .push({
        id: sessionId
      })
      .write();
  }
  console.log('sessionId', sessionId)
  next();
};
//em chào anh.. em vừa nhắn trên kia đấy ạ
// dạ.. em cảm ơn ạ
// ok để mình xem code của bạn há
// nãy glicth của em k set cookie vì thiếu 2 dòng kia..chuyển sang cửa sổ khác thì nó tự set :))
// dạ em chuyển sang cửa sổ khác thì tự set;.. còn nếu ở đây thì không ạ... trang glitch tự động .. 
// đấy là vấn đề của em đấy ạ.. khi refresh thì nó cứ tạo thêm id ạ... warm là do anh em chat ở đây nên nó 
// tự refresh luôn ạ
// mình thấy nó set 
// nhưng mà mình log thì thấy nó log ra nhiều cái sessionId không biết có phải bạn refesh nên nó log không 
// um xài cái chuyển qua cửa sổ khác ấy 
// hừm lạ ta mình cũng không biết tại sao
