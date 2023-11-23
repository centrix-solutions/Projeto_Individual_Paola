var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.post("/enviarAlerta", function (req, res) {
    notificacaoController.enviarAlerta(req, res);
})
router.post("/verificarAlerta", function (req, res) {
    notificacaoController.verificarAlerta(req, res);
})
router.post("/retirarAlerta", function (req, res) {
    notificacaoController.retirarAlerta(req, res);
})

router.post("/verificaNotificacao", function (req, res) {
    notificacaoController.verificaNotificacao(req, res);
})
router.post("/retirarNotificacao", function (req, res) {
    notificacaoController.retirarNotificacao(req, res);
})

module.exports = router;