const express = require("express");

const controller = require("../controllers/login.controller.js");

const router = express.Router();

router.post("/login", controller.postLogin);

module.exports = router;
