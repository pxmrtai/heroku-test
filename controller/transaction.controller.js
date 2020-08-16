
const db = require('../db')
const shortid = require('shortid')




module.exports.rentalIndex = (req,res)=>{
  res.render("transaction/index",{
      listBook : db.get("list").value(),
     listUser : db.get("user").value(),
     rentalList : db.get('rentalList').value()
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
module.exports.view = (req,res)=>{
    var rentalid = req.params.id;
    var rental = db.get('rentalList').find({id:rentalid}).value()
    var errors = []
    if(!req.body.id){
      errors.push('user not exsit')
    }
    if(errors.length){
      res.render('transaction/:id',{
       errors: errors
    })
    }
      
    res.render('transaction/view',{
        rentalList: rental,
        list: db.get("rentalList").value
    })
    
}

module.exports.postCreateRentalList = (req,res)=>{
    req.body.id = shortid.generate();
    db.get('rentalList').push(req.body).write()
    res.redirect('/transaction/index')
}
module.exports.update = (req,res)=>{
  
    db.get('rentalList')
    .find({ id:  req.body.id })
    .assign({status: req.body.status})
    .write()
  console.log(req.body)
  console.log(req.body.id)
  console.log(req.body.status)
    res.redirect('/transaction/index')
}