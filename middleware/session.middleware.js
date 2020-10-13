var shortId = require("shortid");
const db = require("../db");

module.exports = (req, res, next) => {
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
  next();
};

