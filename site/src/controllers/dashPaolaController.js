var dashPaolaModel = require("../models/dashPaolaModel");

// Gráfico CPU
function buscarUltimasMedidasCpu(req, res) {
    var idEmpresa =  req.params.idEmpresa;

    console.log(idEmpresa + "entrei controller")

    dashPaolaModel.buscarUltimasMedidasCpu(idEmpresa).then(function (resultado) {
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

function buscarMedidasEmTempoRealCpu(req, res) {
    
    var idEmpresa =  req.params.idEmpresa;

    console.log(`Recuperando medidas em tempo real`);

    dashPaolaModel.buscarMedidasEmTempoRealCpu(idEmpresa).then(function (resultado) {
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

// Gráfico RAM
function buscarUltimasMedidasRam(req, res) {
    var idEmpresa =  req.params.idEmpresa;

    console.log(idEmpresa + "entrei controller")

    dashPaolaModel.buscarUltimasMedidasRam(idEmpresa).then(function (resultado) {
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

function buscarMedidasEmTempoRealRam(req, res) {
    
    var idEmpresa =  req.params.idEmpresa;
    console.log("ID DA EMPRESAAAA ------------->", idEmpresa)

    console.log(`Recuperando medidas em tempo real`);

    dashPaolaModel.buscarMedidasEmTempoRealRam(idEmpresa).then(function (resultado) {
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

// KPI
function buscarUltimasMedidasDesempenhoMedia(req, res) {

    console.log(`Recuperando as ultimas medidas`);

    dashPaolaModel.buscarUltimasMedidasDesempenhoMedia().then(function (resultado) {
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
    
    console.log(`Recuperando medidas em tempo real`);

    dashPaolaModel.buscarMediasEmTempoRealDesempenho().then(function (resultado) {
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

// KPI total
function buscarUltimasTotalEmTempoReal(req, res) {
    
    console.log(`Recuperando medidas em tempo real`);

    dashPaolaModel.buscarUltimasTotalEmTempoReal().then(function (resultado) {
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
    buscarUltimasMedidasCpu,
    buscarMedidasEmTempoRealCpu,
    buscarUltimasMedidasRam,
    buscarMedidasEmTempoRealRam,
    buscarUltimasMedidasDesempenhoMedia,
    buscarMedidasEmTempoRealDesempenhoMedia,
    buscarUltimasTotalEmTempoReal,
}