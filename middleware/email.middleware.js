const db = require('../db')


module.exports.notExist = (req,res,next)=>{

  var email = req.body.email
  var user= db.get('user').find({email: email}).value()
  console.log('asd'+ req.body.email)

  if(!user){
    res.render('transaction/create',{
      listBook : db.get("list").value(),
     listUser : db.get("user").value(),
     status : db.get("rentalList").value(),
     rentalList: db.get("rentalList").value(),
      errors:[
        'email does not exist'
      ],
      values: req.body
      
    })
     return
  }
   next()
}
module.exports.existed = (req,res,next)=>{

  var email = req.body.email
  var user= db.get('user').find({email: email}).value()
  if(user){
    res.render('auth/resign',{
      listBook : db.get("list").value(),
     listUser : db.get("user").value(),
     status : db.get("rentalList").value(),
     rentalList: db.get("rentalList").value(),
      errors:[
        'email already existed'
      ],
      values: req.body
      
    })
     return
  }
   next()
}
