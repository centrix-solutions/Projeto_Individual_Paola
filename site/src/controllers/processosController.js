var processosModel = require("../models/processosModel");

function listarProcessos(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    var idAndar = req.body.idAndarServer;
    var filtro = req.body.filtroServer;
    var pesquisa = req.body.pesquisaServer;

    processosModel.listarProcessos(idEmpresa, idAndar, filtro, pesquisa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nSomething is wrong Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function deletarProcessos(req, res) {

    var processosParaDeletar = req.body.processosParaDeletarServer;

    processosModel.deletarProcessos(processosParaDeletar)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nSomething is wrong Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function buscarDadosGrafico(req, res) {

    var vetorCheckbox = req.body.vetorCheckboxServer;

    processosModel.buscarDadosGrafico(vetorCheckbox)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nSomething is wrong Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarProcessos,
    deletarProcessos,
    buscarDadosGrafico
}