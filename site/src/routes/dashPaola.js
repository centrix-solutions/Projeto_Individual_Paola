var express = require("express");
var router = express.Router();

var dashPaolaController = require("../controllers/dashPaolaController");

router.get("/grafico", function (req, res) {
    dashPaolaController.listar(req, res);
});

router.get("/ultimasDesempenhoMedia/:idEmpresa", function (req, res) {
    dashPaolaController.buscarUltimasMedidasDesempenhoMedia(req, res);
});

router.get("/tempo-realDesempenhoMedia/:idLinha", function (req, res) {
    dashPaolaController.buscarMedidasEmTempoRealDesempenhoMedia(req, res);
})

module.exports = router;