var epxress = require('express');
var router = epxress.Router();
const db = require('../db')
const shortid = require('shortid')
const bodyParser = require('body-parser')

var controller = require('../controller/user.controller')
var validation = require('../validation/users.validation')
var emailMiddleware = require('../middleware/email.middleware')



router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Set some defaults (required if your JSON file is empty)
db.defaults({ user: [{"isLogin":0}] })
  .write()

router.get('/index', controller.index)
router.get('/customer',controller.customer)
router.get('/userLogin',controller.userLogin)
router.get('/profile/avatar',controller.changeAvatar)


router.get('/:id',controller.view)


router.get("/index/:id/delete",controller.delete)



module.exports = router;