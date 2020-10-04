const db = require("../db");
const shortid = require("shortid");
var cloudinary = require('cloudinary').v2;

var emailMiddleware = require("../middleware/email.middleware");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

module.exports.customer = (req, res) => {
  var listBook = db.get("list").value();
  var rentalList = db.get("rentalList").value();
  
  res.render("userOnly/customer", {
    list: db.get("list").value(),
    rentalList: rentalList
  });
};
module.exports.userLogin = (req, res) => {
  if (req.signedCookies.userId) {
    var user = db
      .get("user")
      .find({ id: req.signedCookies.userId })
      .value();

    res.render("userOnly/index", {
      user: user
    });
    return;
  }
};
module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  console.log(page);
  var perPage = 2;
  var start = (page - 1) * perPage;
  var end = (page - 1) * perPage + perPage;
  var maxPage =  Math.ceil(db.get("user").value().length / perPage);
  res.render("users/index", {
    page,
    maxPage,
    userList: db
      .get("user")
      .drop(start)
      .take(perPage)
      .value()
  });
};
module.exports.view = (req, res) => {
  var id = req.params.id;
  var user = db.get('user').find({id: id}).value()
  console.log(user);
  res.render("users/view", {
    user: user
  });
};

module.exports.delete = function(req, res) {
  db.get("user")
    .remove({ id: req.params.id })
    .write();

  res.redirect("/users/index");
};
module.exports.createUser = (req, res) => {
  res.render("users/create", {});
};
module.exports.changeAvatar = (req, res) => {
  var id = req.body.id
  console.log(id)
  res.render("users/profile/avatar",{
    user: db.get('user').find({id: req.body.id}).value()
  });
};
module.exports.postChangeAvatar = (req, res) => {
  var id = req.params.id;
  var user = db
      .get("user")
      .find({ id: id })
      .value();
  req.body.avatar = req.file.path.split("/").slice(1).join("/");
  db.get('user')
  .find({ id: req.signedCookies.userId })
  .assign({ avatar: req.file.path})
  .write()
  res.redirect('/users/profile')
};
