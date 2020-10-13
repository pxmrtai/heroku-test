var epxress = require('express');
var controller = require('../controller/cart.controller')
var router = epxress.Router();
const db = require('../db')

router.get('/add/:cartId',controller.addToCart)



module.exports = router