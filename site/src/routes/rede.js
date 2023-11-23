var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/importancia/:idMaquina",  function (req, res) {
    redeController.buscarImportanciaMaquina(req, res);
});

router.get("/maqEmp/:idEmpresa", function (req, res){
    redeController.contarMaquinasEmpresa(req, res);
});

router.get("/alertaPerigo/:fkAndarDeTrabalho", function (req, res){
    redeController.recuperarUltimosAlertasAndarPerigo(req, res);
});

router.get("/alertaAtencao/:fkAndarDeTrabalho", function(req, res){
    redeController.recuperarUltimosAlertasAndarAtencao(req, res);
});

router.get("/total/:fkAndarDeTrabalho", function (req, res){
    redeController.recuperarTotalMaquinas(req, res);
});

module.exports = router;