const db = require('../db')


module.exports.notExist = (req,res,next)=>{

  var email = req.body.email
  var user= db.get('user').find({email: email}).value()
  console.log(email)
  console.log(user)
  if(user.email){
    res.render('transaction/create',{
      errors:[
        'email does not exist'
      ],
      values: req.body
      
    })
      next()
  }else{
  res.render('transaction/create',{
      errors:[
        'email does not exist'
      ],
      values: req.body
      
    })
    
  }
}