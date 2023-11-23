var notificacaoModel = require("../models/notificacaoModel");

function enviarAlerta(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;
    var nomeFuncionario = req.body.nomeFuncionarioServer;

    if (idFuncionario == undefined || nomeFuncionario == undefined) {
        res.status(400).send("idFuncionario ou nomeFuncionario está undefined!");
    } else {
        notificacaoModel.enviarAlerta(idFuncionario, nomeFuncionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao enviar o alerta Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function verificarAlerta(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;

    if (idFuncionario == undefined) {
        res.status(400).send("idFuncionario está undefined!");
    } else {
        notificacaoModel.verificarAlerta(idFuncionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao verificar o alerta Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function retirarAlerta(req, res) {

    var idFuncionario = req.body.idFuncionarioServer;

    if (idFuncionario == undefined) {
        res.status(400).send("idFuncionario está undefined!");
    } else {
        notificacaoModel.retirarAlerta(idFuncionario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao retirar o alerta Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function verificaNotificacao(req, res) {

    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        notificacaoModel.verificaNotificacao(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao verificar as notificações Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function retirarNotificacao(req, res) {

    var idEmpresa = req.body.idEmpresaServer;

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        notificacaoModel.retirarNotificacao(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao retirar a notificação Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    enviarAlerta,
    verificarAlerta,
    retirarAlerta,
    verificaNotificacao,
    retirarNotificacao
}