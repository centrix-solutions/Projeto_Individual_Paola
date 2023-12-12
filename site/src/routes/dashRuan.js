var express = require("express");
var router = express.Router();

var dashRuanController = require("../controllers/dashRuanControllers");

router.get("/calcular", function (req, res) {
    dashRuanController.calcular(req, res);
});

router.get("/metricas_tempo_real", function (req, res) {
    dashRuanController.obterMetricasTempoReal(req, res);
});

module.exports = router;