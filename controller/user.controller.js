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
  var user = db.get('user').find({id: req.signedCookies.userId}).value()
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
  res.render("users/profile/avatar", {});
};
module.exports.postChangeAvatar = (req, res) => {
  cloudinary.config({
    cloud_name: 'dvjjx3g49',
    api_key: '795484751145565',
    api_secret: 'NtzjR0Rhy6Fzj7_wkExbwKKuaR0'
});

var self = module.exports = {
    uploadSingle: (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: 'single'
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url
                        })
                    }
                })
        })
    },
    uploadMultiple: (file) => {
        return new Promise(resolve => {
            cloudinary.uploader.upload(file, {
                    folder: 'home'
                })
                .then(result => {
                    if (result) {
                        const fs = require('fs')
                        fs.unlinkSync(file)
                        resolve({
                            url: result.secure_url,
                            id: result.public_id,
                            thumb1: self.reSizeImage(result.public_id, 200, 200),
                            main: self.reSizeImage(result.public_id, 500, 500),
                            thumb2: self.reSizeImage(result.public_id, 300, 300)
                        })
                    }
                })
        })
    },
    reSizeImage: (id, h, w) => {
        return cloudinary.url(id, {
            height: h,
            width: w,
            crop: 'scale',
            format: 'jpg'
        })
    },
}
};
