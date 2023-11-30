var dashPaolaModel = require("../models/dashPaolaModel");

function listar(req, res) {
   dashPaolaModel.listar()
        .then(function (resultado) {
            res.status(200).json(resultado)
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarUltimasMedidasDesempenhoMedia(req, res) {

    // const limite_linhas = 1;

    var idEmpresa= req.params.idEmpresa;

    console.log(`Recuperando as ultimas medidas`);

    dashPaolaModel.buscarUltimasMedidasDesempenhoMedia(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealDesempenhoMedia(req, res) {
    var idEmpresa = req.params.idEmpresa;

    console.log(idEmpresa);

    console.log(`Recuperando medidas em tempo real`);

    dashPaolaModel.buscarMediasEmTempoRealDesempenho(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    // listar,
    buscarUltimasMedidasDesempenhoMedia,
    buscarMedidasEmTempoRealDesempenhoMedia,
}