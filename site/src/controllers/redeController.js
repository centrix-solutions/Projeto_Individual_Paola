var redeModel = require("../models/redeModel");


function buscarImportanciaMaquina(req, res){
    var fkAndarDeTrabalho = req.params.fkAndarDeTrabalho;

    console.log("Recuperando o id da máquina")

    redeModel.buscarImportanciaMaquina(fkAndarDeTrabalho).then(function(resultado) {
        if (resultado != String){
            res.status(200).json(resultado);
            console.log(resultado);
        }else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar pela Importância do Alerta", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    });
}

function contarMaquinasAndar(req, res){
    var fkAndarDeTrabalho = req.params.fkAndarDeTrabalho;

    console.log("Recuperando o id da empresa") 

    redeModel.contarMaquinasAndar(fkAndarDeTrabalho).then(function(resultado) {

        if (resultado > "0"){
            res.status(200).json(resultado[0].TotalAlertasAndar);
        }else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar pela Importância do Alerta", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage)
    });
}

function alertasAndarMeiaLua(req, res){
    var fkAndarDeTrabalho = req.params.fkAndarDeTrabalho;

    console.log("Recuperando Alertas mais recentes...")

    redeModel.alertasAndarMeiaLua(fkAndarDeTrabalho).then(function(resultado){

        if(resultado >= "0"){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar pelos Alertas ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function alertasDoMes(res,res){
    redeModel.alertasDoMes().then(function(resultado){

        if(resultado != Number){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar pelo Total ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiAtencao(res,res){
    redeModel.kpiAtencao().then(function(resultado){

        if(resultado != Number){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar pelo Total ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiPerigo(res,res){
    redeModel.kpiPerigo().then(function(resultado){
        if(resultado != Number){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar pelo Total ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarComputadoresPorAndar(req, res) {

    var idAndar = req.body.idAndarServer;
    redeModel.buscarComputadoresPorAndar(idAndar)
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

function atualizarRede(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    var download = req.body.downloadServer;
    var upload = req.body.uploadServer;
    var vetorComputadores = req.body.vetorComputadorServer;
    redeModel.atualizarRede(idEmpresa, download, upload, vetorComputadores)
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

function buscarMaxDownUp(req, res) {

    var idAndar = req.body.idAndarServer;
    redeModel.buscarMaxDownUp(idAndar)
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

function buscarDadoDownUp(req, res) {

    var idEmpresa = req.body.idEmpresaServer;
    var vetorComputadores = req.body.vetorComputadorServer;
    redeModel.atualizarRede(idEmpresa, vetorComputadores)
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

module.exports = {
    buscarImportanciaMaquina,
    contarMaquinasAndar,
    alertasAndarMeiaLua,
    alertasDoMes,
    kpiAtencao,
    kpiPerigo,
    buscarComputadoresPorAndar,
    atualizarRede,
    buscarMaxDownUp,
    buscarDadoDownUp
}