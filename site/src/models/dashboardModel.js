var database = require("../database/config");

function buscarComputadores(idEmpresa, idAndar) {
    if (idAndar == null) {
        var instrucao = `SELECT 
        Maquinas.idMaquina, 
        MAX(Maquinas.Sistema_Operacional) as Sistema_Operacional, 
        MAX(Maquinas.Id_do_dispositivo) as Id_do_dispositivo, 
        MAX(Maquinas.posicaoX) as posicaoX, 
        MAX(Maquinas.posicaoY) as posicaoY, 
        MAX(Maquinas.fkEmpMaq) as fkEmpMaq, 
        MAX(Maquinas.fkAndarDeTrabalho) as fkAndarDeTrabalho, 
        MAX(Login.dataHoraEntrada) as dataHoraEntrada, 
        MAX(Login.dataHoraSaida) as dataHoraSaida, 
        MAX(Login.Email) as Email 
    FROM 
        Maquinas 
    LEFT JOIN 
        Login ON Maquinas.idMaquina = Login.idMaquina 
    WHERE 
        fkEmpMaq = ${idEmpresa} 
        AND fkAndarDeTrabalho IS NULL 
    GROUP BY 
        Maquinas.idMaquina;
    `
    } else {
        var instrucao = `SELECT 
        Maquinas.idMaquina, 
        MAX(Maquinas.Sistema_Operacional) as Sistema_Operacional, 
        MAX(Maquinas.Id_do_dispositivo) as Id_do_dispositivo, 
        MAX(Maquinas.posicaoX) as posicaoX, 
        MAX(Maquinas.posicaoY) as posicaoY, 
        MAX(Maquinas.fkEmpMaq) as fkEmpMaq, 
        MAX(Maquinas.fkAndarDeTrabalho) as fkAndarDeTrabalho, 
        MAX(Login.dataHoraEntrada) as dataHoraEntrada, 
        MAX(Login.dataHoraSaida) as dataHoraSaida, 
        MAX(Login.Email) as Email 
    FROM 
        Maquinas 
    LEFT JOIN 
        Login ON Maquinas.idMaquina = Login.idMaquina 
    WHERE 
        fkEmpMaq = ${idEmpresa} 
        AND fkAndarDeTrabalho = ${idAndar} 
    GROUP BY 
        Maquinas.idMaquina;`
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