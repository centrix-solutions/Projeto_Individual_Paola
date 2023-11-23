var database = require("../database/config");

function buscarComputadores(idEmpresa, idAndar) {
    if (idAndar == null) {
        var instrucao = `SELECT Maquinas.idMaquina, Maquinas.Sistema_Operacional, Maquinas.Id_do_dispositivo, Maquinas.posicaoX, Maquinas.posicaoY, Maquinas.fkEmpMaq, Maquinas.fkAndarDeTrabalho, Login.dataHoraEntrada, Login.dataHoraSaida, Login.Email FROM Maquinas LEFT JOIN Login on Maquinas.idMaquina = Login.idMaquina WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho IS NULL;`;
    } else {
        var instrucao = `SELECT Maquinas.idMaquina, Maquinas.Sistema_Operacional, Maquinas.Id_do_dispositivo, Maquinas.posicaoX, Maquinas.posicaoY, Maquinas.fkEmpMaq, Maquinas.fkAndarDeTrabalho, Login.dataHoraEntrada, Login.dataHoraSaida, Login.Email FROM Maquinas LEFT JOIN Login on Maquinas.idMaquina = Login.idMaquina WHERE fkEmpMaq = '${idEmpresa}' AND fkAndarDeTrabalho = ${idAndar}`;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function salvarPosicaoComputadores(idComputador, x, y) {
    var instrucao = `UPDATE Maquinas SET posicaoX = ${x}, posicaoY = ${y} WHERE idMaquina = ${idComputador};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarAndar(cadastro) {
    var instrucao = `INSERT INTO Andar_de_trabalho (num_andar, foto_andar, fkEmpAndar) VALUES (${cadastro.numAndar}, '${cadastro.imagem}', ${cadastro.idEmpresa})`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function buscarAndares(idEmpresa) {
    
    var instrucao = `SELECT * FROM andar_de_trabalho WHERE fkEmpAndar = ${idEmpresa};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarComputadores,
    cadastrarAndar,
    salvarPosicaoComputadores,
    buscarAndares
}