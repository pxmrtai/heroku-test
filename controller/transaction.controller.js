
const db = require('../db')
const shortid = require('shortid')
var Session = require('../models/session.model')
var User = require('../models/user.model')
var Book = require('../models/book.model')





module.exports.rentalIndex = async(req,res,next)=>{


  var page = parseInt(req.query.page) || 1;
  // console.log(page);
   var perPage = 3;
  Session
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, rentalList) => {
        Session.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
           res.render('transaction/index',{
               rentalList,
               page,
               maxPage: Math.ceil(count/perPage)
           }) 
        });
      });
  
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 5;
  // var start = (page - 1) * perPage;
  // var end = (page - 1) * perPage + perPage;
  // var maxPage =  Math.ceil(db.get("rentalList").value().length / perPage);
  // res.render("transaction/index",{
  //     page,
  //   maxPage,
  //   rentalList: db
  //     .get("rentalList")
  //     .drop(start)
  //     .take(perPage)
  //     .value()
  // })
}
module.exports.createRentalList =async(req,res)=>{
  var listBook = await Book.find()
  var listUser = await User.find()
  var rentalList = await Book.find()


  res.render("transaction/create",{
     listBook : db.get("list").value(),
     listUser : db.get("user").value(),
     rentalList: db.get("rentalList").value()
  })
  
}


module.exports.postCreateRentalList = (req,res)=>{
    var user = db.get('user').value()
    req.body.id = shortid.generate();
    db.get('rentalList').push(req.body).write()
    res.redirect('/transaction/index')
  
}


module.exports.getcomplete = (req, res) => {
  db.get('rentalList').find({id: req.params.id}).assign({isComplete: true}).write();
  res.redirect('/transaction/index');
};