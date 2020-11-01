var epxress = require('express');
var router = epxress.Router();
const db = require('../db')
const shortid = require('shortid')
const bodyParser = require('body-parser')
var controller = require('../controller/transaction.controller')
var emailMiddleware = require('../middleware/email.middleware')
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })


router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Set some defaults (required if your JSON file is empty)

router.get("/:id/complete",controller.getcomplete)

router.get("/index",controller.rentalIndex)

router.get("/create",controller.createRentalList)





router.post('/create',emailMiddleware.notExist,upload.single('avatar'), controller.postCreateRentalList)
// router.post('/update',(req,res)=>{
  
// })
// router.post('/update',controller.update)


module.exports= router;