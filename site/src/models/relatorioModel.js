var database = require("../database/config");

function buscarComputadoresRelatorio(idEmpresa) {


    var instrucao = `SELECT * FROM Maquinas WHERE fkEmpMaq = ${idEmpresa};`


    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

function buscarSelect(select) {

    var instrucao = select

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

function buscarSelectSummary(select) {

    var instrucao = select

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

function buscarSelectRede(select) {

    var instrucao = select

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

function buscarSelectLatencia(select) {

    var instrucao = select

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

function verificarDatas(selectData) {

    var instrucao = selectData

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

module.exports = {
    buscarComputadoresRelatorio,
    buscarSelectLatencia,
    buscarSelectSummary,
    buscarSelectRede,
    verificarDatas,
    buscarSelect
    
};