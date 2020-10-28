require("dotenv").config();
const md5 = require('md5')
const cloudinary = require('cloudinary').v2
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const shortid = require('shortid')
var nodemailer = require('nodemailer');
var User = require('../models/user.model')



cloudinary.config({
    cloud_name: "dvjjx3g49",
    api_key: "795484751145565",
    api_secret: "NtzjR0Rhy6Fzj7_wkExbwKKuaR0"
  });


module.exports.resign=async(req,res)=>{

  res.render('auth/resign')
  
}

module.exports.login = async(req,res)=>{
    res.render('auth/login')
}

module.exports.postResign = async (req,res)=>{
  var password = req.body.password;
  var email= req.body.email
  if(req.body.avatar){ req.body.avatar = req.file.path.split("/").slice(1).join("/");}
 

   req.body.id = shortid.generate();

  var hashPassword = await bcrypt.hash(password, saltRounds);
  req.body.password = hashPassword;
  
 

  db.get('user').push(req.body).write()
//   var b=db.get('user').find({email:email})
// .push({isLogin: 1})
// .write()
  var values = req.body
  console.log(values)
  res.render('auth/login',{
    sucess:[
      'sign up sucessful'
    ],
  })
    // upload image here
  if(req.body.avatar){
   return cloudinary.uploader.upload(req.file.path)
    .then((result) => {
      res.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
  }
  }

module.exports.postLogin = async (req,res,next)=>{
  var email = req.body.email
  var password = req.body.password

  var user =
      await User.findOne({email:email})
      // db.get('user').find({email:email}).value()
  console.log(user)
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
    
    if(!user.isLogin){var check=  
         await User.findOneAndUpdate({email:email},{isLogin: 0})
    //     db.get("user")
    //   .find({email:email })
    //   .set("isLogin", 0)
    //   .write();
    // console.log('check'+check)}
    }
var wrongTime=  
    await User.findOneAndUpdate({email:email},{isLogin: user.isLogin+1})
//     db.get('user')
// .find({email:email})
// .assign({isLogin: user.isLogin+1})
// .write()
console.log(wrongTime)
    if(wrongTime.isLogin>3){
      
      await User.findOneAndUpdate({email:email},{"isLogin": 0})
     var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.EMAIL_SECRET,
           pass: process.env.PASSWORD_SECRET
       }
   });
      const mailOptions = {
    from: 'tuantaitest97@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<b>Hello world?</b>'// plain text body
  };
       transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });
      return res.render('auth/login',{
      wrongEmail:[
         'We sent you an email'
       ],
      values: req.body
   });
    }
      
    
    
    
    
    
    return res.render('auth/login',{
      errors:[
         'Wrong password.'
       ],
      values: req.body
   });
  }



   res.cookie('userId',user._id,{
    signed: true,
    sameSite: 'None',
    secure: true
  }
            );


  
  
  
res.redirect('/')

  
   

}