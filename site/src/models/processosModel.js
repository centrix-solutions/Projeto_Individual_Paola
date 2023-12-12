var database = require("../database/config");

function listarProcessos(idEmpresa, idAndar, filtro, pesquisa) {
    if (pesquisa != undefined) {
        var instrucao = `
        SELECT 
        	Processo.titulo,
            Maquinas.Id_do_dispositivo,
        	Maquinas.idMaquina,
            Processo.fkMaqProc,
            Processo.idProcesso,
            Login.email
        FROM
            Maquinas
        LEFT JOIN
            andar_de_trabalho
        ON
            Maquinas.fkAndarDeTrabalho = andar_de_trabalho.idAndar_de_trabalho
        JOIN
            Empresa
        ON
            Empresa.idEmpresa = Maquinas.fkEmpMaq
        LEFT JOIN
            Login
        ON
            Maquinas.Id_do_dispositivo = Login.Id_do_dispositivo
        LEFT JOIN
            Processo
        ON
            Maquinas.idMaquina = Processo.fkMaqProc
        WHERE
            Empresa.idEmpresa = ${idEmpresa} AND Maquinas.Id_do_dispositivo LIKE '%${pesquisa}%';`;
        console.log("Executando listarProcessos com pesquisa: \n" + instrucao);
        return database.executar(instrucao);
    }
    if (!filtro) {
        var instrucao = `
        SELECT 
        	Processo.titulo,
            Maquinas.Id_do_dispositivo,
        	Maquinas.idMaquina,
            Processo.fkMaqProc,
            Processo.idProcesso,
            Login.email
        FROM
            Maquinas
        LEFT JOIN
            andar_de_trabalho
        ON
            Maquinas.fkAndarDeTrabalho = andar_de_trabalho.idAndar_de_trabalho
        JOIN
            Empresa
        ON
            Empresa.idEmpresa = Maquinas.fkEmpMaq
        LEFT JOIN
            Login
        ON
            Maquinas.Id_do_dispositivo = Login.Id_do_dispositivo
        LEFT JOIN
            Processo
        ON
            Maquinas.idMaquina = Processo.fkMaqProc
        WHERE
            Empresa.idEmpresa = ${idEmpresa};`;
        console.log("Executando listarProcessos sem filtro: \n" + instrucao);
        return database.executar(instrucao);
    }
    if (idAndar == null) {
        var instrucao = `
        SELECT 
        	Processo.titulo,
            Maquinas.Id_do_dispositivo,
        	Maquinas.idMaquina,
            Processo.fkMaqProc,
            Processo.idProcesso,
            Login.email
        FROM
            Maquinas
        LEFT JOIN
            andar_de_trabalho
        ON
            Maquinas.fkAndarDeTrabalho = andar_de_trabalho.idAndar_de_trabalho
        JOIN
            Empresa
        ON
            Empresa.idEmpresa = Maquinas.fkEmpMaq
        LEFT JOIN
            Login
        ON
            Maquinas.Id_do_dispositivo = Login.Id_do_dispositivo
        LEFT JOIN
            Processo
        ON
            Maquinas.idMaquina = Processo.fkMaqProc
        WHERE
            Empresa.idEmpresa = ${idEmpresa} AND Maquinas.fkAndarDeTrabalho IS NULL;`;
    } else {
        var instrucao = `
        SELECT 
        	Processo.titulo,
            Maquinas.Id_do_dispositivo,
        	Maquinas.idMaquina,
            Processo.fkMaqProc,
            Processo.idProcesso,
            Login.email
        FROM
            Maquinas
        LEFT JOIN
            andar_de_trabalho
        ON
            Maquinas.fkAndarDeTrabalho = andar_de_trabalho.idAndar_de_trabalho
        JOIN
            Empresa
        ON
            Empresa.idEmpresa = Maquinas.fkEmpMaq
        LEFT JOIN
            Login
        ON
            Maquinas.Id_do_dispositivo = Login.Id_do_dispositivo
        LEFT JOIN
            Processo
        ON
            Maquinas.idMaquina = Processo.fkMaqProc
        WHERE
            Empresa.idEmpresa = ${idEmpresa} AND Maquinas.fkAndarDeTrabalho = ${idAndar};`;
    }
    console.log("Executando listarProcessos com filtro: \n" + instrucao);
    return database.executar(instrucao);
}
function deletarProcessos(processosParaDeletar) {
    var instrucao = `UPDATE Processo SET status = 0 WHERE idProcesso IN (${processosParaDeletar});`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function buscarDadosGrafico(vetorCheckbox) {
    var instrucao = `
    SELECT dg.*, Maquinas.Id_do_dispositivo
    FROM dadosGrafico dg
    JOIN (
        SELECT fkMaqDados, MAX(idDadosGrafico) AS max_id
        FROM dadosGrafico
        WHERE fkMaqDados IN (${vetorCheckbox})
        GROUP BY fkMaqDados
    ) max_ids ON dg.fkMaqDados = max_ids.fkMaqDados AND dg.idDadosGrafico = max_ids.max_id
    JOIN Maquinas ON dg.fkMaqDados = Maquinas.idMaquina;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarProcessos,
    deletarProcessos,
    buscarDadosGrafico
}