var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.post("/listarProcessos", function (req, res) {
    processosController.listarProcessos(req, res);
})
router.post("/deletarProcessos", function (req, res) {
    processosController.deletarProcessos(req, res);
})
router.post("/buscarDadosGrafico", function (req, res) {
    processosController.buscarDadosGrafico(req, res);
})

module.exports = router;