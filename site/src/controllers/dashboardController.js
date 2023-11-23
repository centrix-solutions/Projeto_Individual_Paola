var dashboardModel = require("../models/dashboardModel");

function buscarComputadores(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    var idAndar = req.body.idAndarServer;

    console.log(`Recuperando o idEmpresa`);
    if (idEmpresa == undefined) {
        res.status(400).send("Id da Empresa está undefined!");
    } else {
    dashboardModel.buscarComputadores(idEmpresa, idAndar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar a fkempresa Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarAndar(req, res) {
    const imagem = req.file.filename;
    const {numAndar, idEmpresa} = req.body;
  
    const cadastro = {numAndar, imagem, idEmpresa};
    dashboardModel.cadastrarAndar(cadastro)
        .then(resultado => {
            res.status(201).send("Usuario criado com sucesso");
        }).catch(err => {
            res.status(500).send(err);
        });
}
function salvarPosicaoComputadores(req, res) {

    var idComputador = req.body.idComputadorServer;
    var x = req.body.xServer;
    var y = req.body.yServer;

    if (idComputador == undefined || x == undefined || y == undefined) {
        res.status(400).send("Algum campo está undefined!");
    } else {
    dashboardModel.salvarPosicaoComputadores(idComputador, x, y)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao salvar a posição dos computadores Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarAndares(req, res) {

    var idEmpresa = req.body.idEmpresaServer;

    console.log(`Recuperando o idEmpresa`);
    if (idEmpresa == undefined) {
        res.status(400).send("Id da Empresa está undefined!");
    } else {
    dashboardModel.buscarAndares(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar a fkempresa Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarComputadores,
    cadastrarAndar,
    salvarPosicaoComputadores,
    buscarAndares
}