var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/importancia/:idMaquina",  function (req, res) {
    redeController.buscarImportanciaMaquina(req, res);
});

router.get("/maqEmp/:idEmpresa", function (req, res){
    redeController.contarMaquinasEmpresa(req, res);
});

router.get("/alertaAndarMeiaLua/:fkAndarDeTrabalho", function (req, res){
    redeController.alertasAndarMeiaLua(req, res);
});

router.get("/alertaMes", function (res, res){
    redeController.alertasDoMes(res, res);
});

module.exports = router;