var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// COMEÇO FOTO

const upload = require('../../public/js/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
router.get("", (req, res) => {
    res.render("dashboard_main")
});
router.post("/cadastrarAndar", upload.single('foto'), (req, res) => {
    dashboardController.cadastrarAndar(req, res);
})

// FIM FOTO


router.post("/buscarComputadores", function (req, res) {
    dashboardController.buscarComputadores(req, res);
})
router.post("/salvarPosicaoComputadores", function (req, res) {
    dashboardController.salvarPosicaoComputadores(req, res);
})
router.post("/buscarAndares", function (req, res) {
    dashboardController.buscarAndares(req, res);
})

module.exports = router;