var express = require("express");
var router = express.Router();

var dashPaolaController = require("../controllers/dashPaolaController");

// Gráfico CPU
router.get("/graficoCPU/:idEmpresa", function (req, res) {
    dashPaolaController.buscarUltimasMedidasCpu(req, res);
});

router.get("/graficoAtualizarCPU/:idEmpresa", function (req, res) {
    dashPaolaController.buscarMedidasEmTempoRealCpu(req, res);
});

// Gráfico RAM

router.get("/graficoRAM/:idEmpresa", function (req, res) {
    dashPaolaController.buscarUltimasMedidasRam(req, res);
});

router.get("/graficoAtualizarRAM/:idEmpresa", function (req, res) {
    dashPaolaController.buscarMedidasEmTempoRealRam(req, res);
});

// KPI
router.get("/ultimasDesempenhoMedia/", function (req, res) {
    dashPaolaController.buscarUltimasMedidasDesempenhoMedia(req, res);
});

router.get("/tempoRealDesempenhoMedia/", function (req, res) {
    dashPaolaController.buscarMedidasEmTempoRealDesempenhoMedia(req, res);
});

// KPI total
router.get("/tempoRealKpiTotal/", function (req, res) {
    dashPaolaController.buscarUltimasTotalEmTempoReal(req, res);
});

module.exports = router;