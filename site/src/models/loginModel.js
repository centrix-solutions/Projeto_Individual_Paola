var database = require("../database/config")

function buscarLogin(idEmpresa) {
    var instrucao = `SELECT * FROM Login WHERE idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarLogin
};