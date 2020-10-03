var epxress = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })
var router = epxress.Router();
const db = require('../db')
var validation = require('../validation/users.validation')
var emailMiddleware = require('../middleware/email.middleware')




var controller = require('../controller/auth.controller')
router.get('/login',controller.login)
router.get('/resign',emailMiddleware.existed,controller.resign)

router.post('/login',controller.postLogin)
router.post('/resign', upload.single('avatar')
            ,validation.createUser
            ,emailMiddleware.existed
            ,controller.postResign)
module.exports= router;
