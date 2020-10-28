const db = require("../db");

module.exports.createUser = (req, res, next) => {
  

  var errors = [];
 
  
  if (!req.body.name) {
    errors.push("Name is quired");
  }
  if (errors.length) {
    res.render("auth/resign", {
      errors: errors
    });

    return;
  }
  next();
};
