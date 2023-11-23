var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/buscarComponentes", function (req, res) {
    medidaController.buscarComponentes(req, res);
});

router.post("/buscarComputadores", function (req, res) {
    medidaController.buscarComputadores(req, res);
});

router.post("/mudarAndarMaquina", function (req, res) {
    medidaController.mudarAndarMaquina(req, res);
});

router.delete("/deletarComputador", function (req, res) {
    medidaController.deletarComputador(req, res);
})

router.get("/ultimas/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasCPU(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCPU(req, res);
});

router.get("/ultimas-ram/:idMaquina", function (req, res) {
    medidaController.buscarUltimasMedidasRAM(req, res);
});

router.get("/tempo-real-ram/:idMaquina", function (req, res) {
    medidaController.buscarMedidasEmTempoRealRAM(req, res);
});

router.post("/buscarCpu", function (req, res) {
    medidaController.buscarCpu(req, res);
});

router.post("/buscarRam", function (req, res) {
    medidaController.buscarRam(req, res);
});

router.post("/buscarDisco", function (req, res) {
    medidaController.buscarDisco(req, res);
});

router.post("/buscarUsb", function (req, res) {
    medidaController.buscarUsb(req, res);
});

router.post("/buscarDownload", function (req, res) {
    medidaController.buscarDownload(req, res);
});

router.post("/buscarUpload", function (req, res) {
    medidaController.buscarUpload(req, res);
});

router.post("/buscarJanelas", function (req, res) {
    medidaController.buscarJanelas(req, res);
});

router.post("/buscarProcessos", function (req, res) {
    medidaController.buscarProcessos(req, res);
});

router.post("/buscarLogin", function (req, res) {
    medidaController.buscarLogin(req, res);
});

module.exports = router;