var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {

    var Nome_fantasia = req.body.nomeFantasiaServer;
    var CNPJ = req.body.cnpjServer;
    var Responsavel_legal = req.body.responsavelLegalServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    

    if (Nome_fantasia == undefined) {
        res.status(400).send("Seu nome fantasia está undefined!");
    } else if (CNPJ == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (Responsavel_legal == undefined) {
        res.status(400).send("Seu responsavel legal está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Sua numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else {
        empresaModel.cadastrarEmpresa(Nome_fantasia, CNPJ, Responsavel_legal, cep, numero, complemento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarFk(req, res) {

    var cnpj = req.body.cnpjServer;

    console.log(`Recuperando a fkempresa`);
    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else {
    empresaModel.buscarFk(cnpj)
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

function cadastrarFuncionario(req, res) {

    var nome = req.body.nomeServer
    var email = req.body.emailServer
    var senha = req.body.senhaServer
    var fkEmpresa = req.body.fkEmpresaServer

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        empresaModel.cadastrarFuncionario(nome, email, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do funcionario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
module.exports = {
    cadastrarEmpresa,
    buscarFk,
    cadastrarFuncionario
}