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

function verificarDatas(selectData) {

    var instrucao = selectData

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

module.exports = {
    buscarComputadoresRelatorio,
    verificarDatas,
    buscarSelect
};