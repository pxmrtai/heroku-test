var shortId = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortId.generate();
    res.cookie("sessisonId", sessionId, {
      signed: true
    });
      db
      .get("sessions")
      .push({
        id: sessionId
      })
      .write();
    console.log('sessionId', sessionId);
  }
  next();
};
//em chào anh.. em vừa nhắn trên kia đấy ạ
// dạ.. em cảm ơn ạ
// ok để mình xem code của bạn há
