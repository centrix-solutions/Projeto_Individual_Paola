var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.post("/buscarComputadoresRelatorio", function (req, res) {
    relatorioController.buscarComputadoresRelatorio(req, res);
});

router.post("/buscarSelect", function (req, res) {
    relatorioController.buscarSelect(req, res);
});

router.post("/verificarDatas", function (req, res) {
    relatorioController.verificarDatas(req, res);
});

module.exports = router;