var express = require("express");
var router = express.Router();

var loginController = require("../controllers/loginController");

router.post("/buscarLogin", function (req, res) {
    loginController.buscarLogin(req, res);
})

module.exports = router;