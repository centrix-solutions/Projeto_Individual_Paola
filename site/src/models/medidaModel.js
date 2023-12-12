var database = require("../database/config");

function mudarAndarMaquina(IDMaquina, IDAndar) {

    var instrucao = `UPDATE Maquinas set fkAndarDeTrabalho = ${IDAndar}, posicaoX = 0, posicaoY = 0 where idMaquina = ${IDMaquina}`
    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)

}

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

function deletarComputador(IDMaquina) {

    var instrucao1 = `DELETE FROM Monitoramento WHERE fkMaqCompMoni = ${IDMaquina};`
    
    var instrucao2 = `DELETE FROM Login WHERE idMaquina = ${IDMaquina}`

    var instrucao3 = `DELETE FROM Componentes_Monitorados WHERE fkMaquina = ${IDMaquina}`

    var instrucao4 = `DELETE FROM Maquinas WHERE idMaquina = ${IDMaquina};`

    console.log("Executando a instrução SQL: \n" + instrucao4)
    
    database.executar(instrucao1)
    .then(() => database.executar(instrucao2))
    .then(() => database.executar(instrucao3))
    .then(() => database.executar(instrucao4))
    .then(() => console.log("Instruções SQL executadas com sucesso."))
    .catch((erro) => console.error("Erro ao executar instruções SQL:", erro));
}

function buscarComponentes(fkMaquina, fkEmpresa) {

    var instrucao = `SELECT valor, fkComponentesExistentes AS idComponente FROM Componentes_Monitorados WHERE fkEmpMaqComp = ${fkEmpresa} AND fkMaquina = ${fkMaquina}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasCPU(idMaquina, limite_linhas) {

    instrucaoSql = ''
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        const limite_linhas = 7
        instrucaoSql = `SELECT TOP ${limite_linhas}
                        Dado_Capturado AS cpu, 
                        Hora_captura AS momento_grafico
                    FROM Monitoramento
                    WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 1
                    ORDER BY idMonitoramento DESC`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        const limite_linhas = 7
        instrucaoSql = `SELECT 
                        Dado_Capturado AS cpu, 
                        Hora_captura AS momento_grafico
                    FROM  Monitoramento
                    WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 1
                    ORDER BY idMonitoramento DESC LIMIT ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(idMaquina, limite_linhas) {

    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        const limite_linhas = 7
        instrucaoSql = `SELECT TOP ${limite_linhas}
                        Dado_Capturado AS cpu, 
                        Hora_captura AS momento_grafico
                    FROM Monitoramento
                    WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 3
                    ORDER BY idMonitoramento DESC`;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        const limite_linhas = 7
        instrucaoSql = `SELECT 
                        Dado_Capturado AS cpu, 
                        Hora_captura
                        AS momento_grafico
                    FROM Monitoramento
                    WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 3
                    ORDER BY idMonitoramento DESC LIMIT ${limite_linhas}`;


    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCPU(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
        Dado_Capturado AS cpu,
        Hora_captura AS momento_grafico,  
        fkMaqCompMoni
        FROM Monitoramento
        WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 1
        ORDER BY idMonitoramento DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        Dado_Capturado AS cpu,
        Hora_captura AS momento_grafico, 
        fkMaqCompMoni
            FROM Monitoramento WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 1
                ORDER BY idMonitoramento DESC LIMIT 1`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT TOP 1
        Dado_Capturado AS ram,
        Hora_captura AS momento_grafico,  
        fkMaqCompMoni
        FROM Monitoramento
        WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 3
        ORDER BY idMonitoramento DESC;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT 
        Dado_Capturado AS ram,
        Hora_captura AS momento_grafico, 
        fkMaqCompMoni
            FROM Monitoramento WHERE fkMaqCompMoni = ${idMaquina} AND fkCompMoniExistentes = 3
               ORDER BY idMonitoramento DESC LIMIT 1`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarCpu(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 1 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 1 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarRam(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 3 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 3 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarDisco(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 2 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 2 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarUsb(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 4 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 4 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarDownload(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 5 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 5 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarUpload(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 6 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 6 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarJanelas(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 7 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 7 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarProcessos(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 8 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT Dado_Capturado AS dado
        FROM Monitoramento
        WHERE fkCompMoniExistentes = 8 AND fkMaqCompMoni = ${fkMaquina} AND fkEmpMaqCompMoni = ${fkEmpresa}
        ORDER BY Data_captura DESC, Hora_captura DESC
        LIMIT 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function buscarLogin(fkMaquina, fkEmpresa) {

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `SELECT TOP 1
        Email AS NomeFuncionario,
        Atividade AS Atividade,
        Id_do_dispositivo AS idComputador,
        CONVERT(VARCHAR, dataHoraEntrada, 120) AS HoraInicioTurno
        FROM Login
        WHERE idEmpresa = ${fkEmpresa} AND idMaquina = ${fkMaquina}
        ORDER BY dataHoraEntrada DESC;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `SELECT
        Email AS NomeFuncionario,
        Atividade AS Atividade,
        Id_do_dispositivo AS idComputador,
        DATE_FORMAT(dataHoraEntrada, '%Y-%m-%d %H:%i:%s') AS HoraInicioTurno
        FROM Login WHERE idEmpresa = ${fkEmpresa} AND idMaquina = ${fkMaquina}
        ORDER BY dataHoraEntrada DESC
        LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    deletarComputador,
    mudarAndarMaquina,
    buscarUltimasMedidasCPU,
    buscarMedidasEmTempoRealCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealRAM,
    buscarComponentes,
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

