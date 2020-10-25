const db = require("../db");
require("dotenv").config();
const shortid = require("shortid");
var cloudinary = require("cloudinary").v2;

var emailMiddleware = require("../middleware/email.middleware");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";
var User = require('../models/user.model')


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
module.exports.index = (req, res,next) => {
   var page = parseInt(req.query.page) || 1;
  // console.log(page);
   var perPage = 2;
  User
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, userList) => {
        User.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
           res.render('users/index',{
               userList,
               current: page,
               pages: Math.ceil(count/perPage),
               n: 0
           }) 
        });
      });
  // var start = (page - 1) * perPage;
  // var end = (page - 1) * perPage + perPage;
  // var maxPage = Math.ceil(db.get("user").value().length / perPage);
  // res.render("users/index", {
  //   page,
  //   maxPage,
  //   userList: db
  //     .get("user")
  //     .drop(start)
  //     .take(perPage)
  //     .value()
  // });
};
module.exports.view = (req, res) => {
  var id = req.params.id
  var user= db.get('user').find({id: req.signedCookies.userId}).value()
  var users = db.get('user').find({id:id}).value()
  res.render("users/view", {
    user: user,
    users: users
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
  var id = req.params.id;
  res.render("users/profile/avatar", {
    user: db
      .get("user")
      .find({ id: id })
      .value()
  });
};
module.exports.postChangeAvatar = (req, res) => {
  var id = req.params.id;
  var user = db
    .get("user")
    .find({ id: id })
    .value();
  req.body.avatar = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  db.get("user")
    .find({ id: req.params.id })
    .assign({ avatar: req.body.avatar })
    .write();
  var admin = db
    .get("user")
    .find({ id: req.signedCookies.userId })
    .value();
  if (!admin.isAdmin) {
    return res.redirect("/users/userLogin");
  }
  if (req.body.avatar) {
    cloudinary.uploader
      .upload(req.file.path)
      .then(result => {
        res.status(200).send({
          result
        });
      })
      .catch(error => {
        res.status(500).send({
          error
        });
      });
  }
  res.redirect("/users/" + id);
};
