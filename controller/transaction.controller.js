
const db = require('../db')
const shortid = require('shortid')




module.exports.rentalIndex = (req,res)=>{
  var page = parseInt(req.query.page) || 1;
  var perPage = 2;
  var start = (page - 1) * perPage;
  var end = (page - 1) * perPage + perPage;
  var maxPage =  Math.ceil(db.get("rentalList").value().length / perPage);
  res.render("transaction/index",{
      page,
    maxPage,
    rentalList: db
      .get("rentalList")
      .drop(start)
      .take(perPage)
      .value()
  })
}
module.exports.createRentalList =(req,res)=>{
  res.render("transaction/create",{
     listBook : db.get("list").value(),
     listUser : db.get("user").value(),
     status : db.get("rentalList").value(),
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