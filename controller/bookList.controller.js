const db = require('../db')
const shortid = require('shortid')
var User = require('../models/user.model')
var Book = require('../models/book.model')



module.exports.index = (req,res) => {
   res.render('index',{
   })
  
}
module.exports.listBook =async (req,res,next)=>{  
    var user= await User.findById({id:req.singedCookies.userId})
    console.log(user)
   var page = parseInt(req.query.page) || 1;
  // console.log(page);
   var perPage = 3;
  Book
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, list) => {
        User.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
           res.render('book',{
               list,
               user,
               page,
               maxPage: Math.ceil(count/perPage)
           }) 
        });
      });
  //     db.get('user')
  // .find({id: req.signedCookies.userId})
  // .value()
  // var logined = req.signedCookies.userId
  //   var page = parseInt(req.query.page) || 1;
  // var perPage = 5;
  // var start = (page - 1) * perPage;
  // var end = (page - 1) * perPage + perPage;
  // var maxPage =  Math.ceil(db.get("list").value().length / perPage);
  // res.render("book",{
  //     page,
  //   maxPage,
  //   user: user,
  //   list: db
  //     .get("list")
  //     .drop(start)
  //     .take(perPage)
  //     .value()
  // })
}
module.exports.view = (req,res)=>{
    var user = db
    .get("user")
    .find({ id: req.signedCookies.userId })
    .value();
    var id = req.params.id;
    var book = db.get('list').find({id:id}).value()
    res.render('view',{
        list: book,
        user: user
    })
}
module.exports.deleteBook =function(req, res) {
     db.get("list")
     .remove({ id: req.params.id})
     .write()
     
 res.redirect('/book')
}
module.exports.getcomplete = (req, res) => {
  db.get('transactions')
    .find({id: req.params.id})
    .assign({isComplete: true}).write();
  res.redirect('/transactions');
};
module.exports.postIndex = (req,res)=>{
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split("/").slice(1).join("/")
  console.log(req.body.avatar)
    db.get('list').push(req.body).write()
    res.redirect('/book')
}
module.exports.update = (req,res)=>{
    db.get('list')
    .find({ id:  req.body.id })
    .assign({title: req.body.title})
    .write()
    res.redirect('/book')
}
module.exports.cart = (req,res)=>{
  var user= db.get('user')
  .find({id: req.signedCookies.userId})
  .value()
   var inCart =  db.get('sessions')
                 .find({id:req.signedCookies.sessionId})
                 .value()
   db.get('rentalList').push(inCart).write()
  db.get('rentalList').find({userId: user.id}).assign({email: user.email}).write()
  

  res.redirect('/book')
}