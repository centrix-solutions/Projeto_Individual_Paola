var relatorioModel = require("../models/relatorioModel");

function buscarComputadoresRelatorio(req, res) {

    var idEmpresa = req.body.idEmpresaServer

    if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa esta undefined")
    } else {

        relatorioModel.buscarComputadoresRelatorio(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarSelect(req, res) {

    var select = req.body.selectGeralServer

    if (select == undefined) {
        res.status(400).send("Seu select esta undefined")
    } else {

        relatorioModel.buscarSelect(select)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarSelectSummary(req, res) {

    var select = req.body.selectSummaryServer

    if (select == undefined) {
        res.status(400).send("Seu select summary esta undefined")
    } else {

        relatorioModel.buscarSelectSummary(select)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarSelectRede(req, res) {

    var select = req.body.selectRedeServer

    if (select == undefined) {
        res.status(400).send("Seu select rede esta undefined")
    } else {

        relatorioModel.buscarSelectRede(select)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarSelectLatencia(req, res) {

    var select = req.body.selectLatenciaServer

    if (select == undefined) {
        res.status(400).send("Seu select latencia esta undefined")
    } else {
        
        relatorioModel.buscarSelectLatencia(select)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificarDatas(req, res) {

    var selectData = req.body.veficarSelectServer

    if (selectData == undefined) {
        res.status(400).send("Seu selectData esta undefined")
    } else {

        relatorioModel.verificarDatas(selectData)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    buscarComputadoresRelatorio,
    buscarSelectLatencia,
    buscarSelectSummary,
    buscarSelectRede,
    verificarDatas,
    buscarSelect
}
