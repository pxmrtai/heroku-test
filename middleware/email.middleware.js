const db = require('../db')
var User = require('../models/user.model')
var Book = require('../models/book.model')


module.exports.notExist = async(req,res,next)=>{

  var email = req.body.email
  var user= await User.findOne({email:email})
  var userList = await User.find()
      // db.get('user').find({email: email}).value()
  
  var book = await Book.find()
  if(!user){
    res.render('transaction/create',{
      listBook : book,
     listUser : userList,
      errors:[
        'email does not exist'
      ],
      values: req.body
      
    })
     return
  }
   next()
}
module.exports.existed = async(req,res,next)=>{

 var email = req.body.email
  var user= await User.findOne({email:email})
  var userList = await User.find()
      // db.get('user').find({email: email}).value()
  
  var book = await Book.find()
  if(user){
    res.render('auth/resign',{
     listBook : book,
     listUser : userList,

      errors:[
        'email already existed'
      ],
      values: req.body
      
    })
     return
  }
   next()
}
