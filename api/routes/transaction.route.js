const express = require("express");

const controller = require("../controllers/transaction.controller.js");

const router = express.Router();

router.get("/transactions", controller.index);

module.exports = router;
