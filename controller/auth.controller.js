const md5 = require('md5')
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const shortid = require('shortid')
var nodemailer = require('nodemailer');




module.exports.resign=(req,res)=>{
  res.render('auth/resign')
 
}

module.exports.login = (req,res)=>{
  res.render('auth/login')

}

module.exports.postResign = async (req,res)=>{
  var password = req.body.password;
   req.body.id = shortid.generate();

  var hashPassword = await bcrypt.hash(password, saltRounds);
  req.body.password = hashPassword;
  
  db.get('user').push(req.body).write()
  res.render('auth/login',{
    sucess:[
      'sign up sucessful'
    ]
  })
}

module.exports.postLogin = async (req,res)=>{
  var email = req.body.email
  var password = req.body.password

  var user= db.get('user').find({email:email}).value()
  
  if(!user){
  
     return res.render('auth/login',{
       
       errors:[
         'User does not exist.'
       ],
       values: req.body
       
     });
  }
  var isCorrectPassword = await bcrypt.compare(password, user.password);
  
  if(!isCorrectPassword){
   
      var email = req.body.email
     
   
var wrongTime=  db.get('user')
.find({email:email})
.assign({isLogin: user.isLogin+1})
.write()
console.log(wrongTime)
    if(wrongTime.isLogin>3){
      
      var a= db.get('user').find({email:email})
.assign({isLogin: 0})
.write()
     var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.EMAIL_SECRET,
           pass: process.env.PASSWORD_SECRET
       }
   });
      const mailOptions = {
    from: 'tuantaitest97@gmail.com', // sender address
    to: 'pxmrtai97@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<b>Hello world?</b>'// plain text body
  };
       transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
    }
      
    
    
    
    
    
    return res.render('auth/login',{
      errors:[
         'Wrong password.'
       ],
      values: req.body
   });
  }
  
  
  res.cookie('userId', user.id,{
    signed: true,
    sameSite: 'None',
    secure: true
  }
            );
  if(user.isAdmin){
    res.redirect('/')

  }
   
  res.redirect('/users/customer')
}
