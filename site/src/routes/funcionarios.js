var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.post("/cadastrarFuncionario", function (req, res) {
   funcionarioController.cadastrarFuncionario(req, res);
})
router.post("/buscarFuncionarios", function (req, res) {
   funcionarioController.buscarFuncionarios(req, res);
})
router.post("/mudarNivelAcesso", function (req, res) {
   funcionarioController.mudarNivelAcesso(req, res);
})
router.post("/mudarAndar", function (req, res) {
   funcionarioController.mudarAndar(req, res);
})

module.exports = router;
