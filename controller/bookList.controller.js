const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req,res) => {
  var user= db.get('user')
  .find({id: req.signedCookies.userId})
  .value()
  
   res.render('index',{
     user:user
   })
  
}
module.exports.listBook = (req,res)=>{    
  var user= db.get('user')
  .find({id: req.signedCookies.userId})
  .value()
   var inCart =  db.get('sessions').find({id:req.signedCookies.sessionId}).value()
   var cart = inCart.cart
   console.log(cart)
  function sum(cart){
     var total = 0
  for(var number of cart){
    return   total = total + number
     
   }
  console.log(sum)
  }
 
  var logined = req.signedCookies.userId
    var page = parseInt(req.query.page) || 1;
  var perPage = 5;
  var start = (page - 1) * perPage;
  var end = (page - 1) * perPage + perPage;
  var maxPage =  Math.ceil(db.get("list").value().length / perPage);
  res.render("book",{
      page,
    maxPage,
    user: user,
    list: db
      .get("list")
      .drop(start)
      .take(perPage)
      .value()
  })
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