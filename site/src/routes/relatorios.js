var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.post("/buscarComputadoresRelatorio", function (req, res) {
    relatorioController.buscarComputadoresRelatorio(req, res)
})

router.post("/buscarSelect", function (req, res) {
    relatorioController.buscarSelect(req, res)
})

router.post("/buscarSelectRede", function (req, res) {
    relatorioController.buscarSelectRede(req, res)
})

router.post("/buscarSelectLatencia", function (req, res) {
    relatorioController.buscarSelectLatencia(req, res)
})

router.post("/buscarSelectSummary", function (req, res) {
    relatorioController.buscarSelectSummary(req, res)
})

router.post("/verificarDatas", function (req, res) {
    relatorioController.verificarDatas(req, res)
})

module.exports = router;