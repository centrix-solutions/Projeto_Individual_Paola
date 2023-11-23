var database = require("../database/config")

function enviarAlerta(idFuncionario, nomeFuncionario) {
    var instrucao = `UPDATE Funcionario SET notificacao = '${nomeFuncionario}' WHERE idfuncionario = ${idFuncionario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function verificarAlerta(idFuncionario) {
    var instrucao = `SELECT notificacao FROM Funcionario WHERE idfuncionario = ${idFuncionario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function retirarAlerta(idFuncionario) {
    var instrucao = `UPDATE Funcionario SET notificacao = '' WHERE idfuncionario = ${idFuncionario}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificaNotificacao(idEmpresa) {
    var instrucao = `SELECT * FROM Notificacao WHERE FKEmpNot = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function retirarNotificacao(idEmpresa) {
    var instrucao = `DELETE FROM Notificacao WHERE fkEmpNot = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    enviarAlerta,
    verificarAlerta,
    retirarAlerta,
    verificaNotificacao,
    retirarNotificacao
};