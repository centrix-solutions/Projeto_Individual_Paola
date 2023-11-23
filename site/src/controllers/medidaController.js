var medidaModel = require("../models/medidaModel");


function mudarAndarMaquina(req, res) {

    var IDMaquina = req.body.idComputadorServer
    var IDAndar = req.body.andarSelecionadoServer

    if (IDMaquina == undefined) {
        res.status(400).send("Seu IDMaquina!")
    } else if (IDAndar == undefined) {
        res.status(400).send("Seu IDAndar está undefined!");
      } else {
      
      medidaModel.mudarAndarMaquina(IDMaquina, IDAndar)
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

function buscarComputadores(req, res) {

    var idEmpresa = req.body.idEmpresaServer
    var idAndar = req.body.idAndarServer

    if (idEmpresa == undefined) {
        res.status(400).send("Seu idEmpresa!")
    } else {
      
      medidaModel.buscarComputadores(idEmpresa, idAndar)
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

function deletarComputador(req, res) {
    
    var IDMaquina = req.body.removerMaquinaSever
   
    if (IDMaquina == undefined) {
        res.status(400).send("Seu IDMaquina está undefined!");
    } else {

        medidaModel.deletarComputador(IDMaquina)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a adição! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarComponentes(req, res) {

    var fkMaquina = req.body.idMaquinaServer

    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando os componentes da empresa: ${fkEmpresa}, maquina: ${fkMaquina}`);
    if (fkMaquina == undefined || fkEmpresa == undefined) {
        res.status(400).send("Suas fks estão undefined!");
    } else {
        medidaModel.buscarComponentes(fkMaquina, fkEmpresa)
            .then(function (resultadoComponente) {
                console.log(`\nResultados encontrados: ${resultadoComponente.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoComponente)}`);

                var resultados = [];

                for (var i = 0; i < resultadoComponente.length; i++) {
                    resultados.push({
                        idComponente: resultadoComponente[i].idComponente,
                        valor: resultadoComponente[i].valor
                    });
                }
                res.json(resultados);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as fks Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}
function buscarUltimasMedidasCPU(req, res) {

    const limite_linhas = 14;

    var idMaquina = req.params.idMaquina;
    
    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasCPU(idMaquina, limite_linhas).then(function (resultado) {
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

function buscarUltimasMedidasRAM(req, res) {

    const limite_linhas = 14;

    var idMaquina = req.params.idMaquina;
    
    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidasRAM(idMaquina, limite_linhas).then(function (resultado) {
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

function buscarMedidasEmTempoRealCPU(req, res) {


    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealCPU(idMaquina).then(function (resultado) {
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

function buscarMedidasEmTempoRealRAM(req, res) {


    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealRAM(idMaquina).then(function (resultado) {
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

function buscarCpu(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarCpu(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de cpu.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarRam(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarRam(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de ram.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDisco(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarDisco(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de disco.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUsb(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarUsb(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de usb.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDownload(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarDownload(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de velocidade de download.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUpload(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarUpload(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos dados de velocidade de upload.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarJanelas(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarJanelas(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas janelas do sistema.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarProcessos(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarProcessos(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos processos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarLogin(req, res) {

    var fkMaquina = req.body.idMaquinaServer
    var fkEmpresa = req.body.idEmpresaServer

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarLogin(fkMaquina, fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as infos de login.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    deletarComputador,
    buscarComponentes,
    mudarAndarMaquina,
    buscarUltimasMedidasCPU,
    buscarMedidasEmTempoRealCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealRAM,
    buscarCpu,
    buscarRam,
    buscarDisco,
    buscarUsb,
    buscarDownload,
    buscarUpload,
    buscarJanelas,
    buscarProcessos,
    buscarLogin,
    buscarComputadores
}
