var database = require("../database/config")

// Gráfico CPU
function buscarUltimasMedidasCpu(idEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
    Dado_Capturado as mediaCpu,
    Hora_captura as horaCaptura
    FROM monitoramento where fkCompMoniExistentes = 1 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
    Dado_Capturado as mediaCpu,
    Hora_captura as horaCaptura
    FROM monitoramento where fkCompMoniExistentes = 1 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCpu(idEmpresa) {
    console.log(idEmpresa + "entrei")
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
    Dado_Capturado as mediaCpu,
    Hora_captura as horaCaptura
    FROM monitoramento where fkCompMoniExistentes = 1 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
    Dado_Capturado as mediaCpu,
    Hora_captura as horaCaptura
    FROM monitoramento where fkCompMoniExistentes = 1 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Gráfico RAM
function buscarUltimasMedidasRam(idEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
    Dado_Capturado as mediaRAM,
    Hora_captura as horaCaptura
    FROM monitoramento where fkCompMoniExistentes = 3 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
        Dado_Capturado as mediaRAM,
        Hora_captura as horaCaptura
        FROM monitoramento where fkCompMoniExistentes = 3 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRam(idEmpresa) {
    console.log(idEmpresa + "entrei")
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
        Dado_Capturado as mediaRAM,
        Hora_captura as horaCaptura
        FROM monitoramento where fkCompMoniExistentes = 3 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
        Dado_Capturado as mediaRAM,
        Hora_captura as horaCaptura
        FROM monitoramento where fkCompMoniExistentes = 3 and fkEmpMaqCompMoni = ${idEmpresa} limit 3;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// kpi
function buscarUltimasMedidasDesempenhoMedia() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select * from viewDesempenhoMedio;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select * from viewDesempenhoMedio;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasEmTempoRealDesempenho(idEmpresa) {

    console.log(idEmpresa);

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select * from viewDesempenhoMedio;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select * from viewDesempenhoMedio;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidasCpu,
    buscarMedidasEmTempoRealCpu,
    buscarUltimasMedidasRam,
    buscarMedidasEmTempoRealRam,
    buscarUltimasMedidasDesempenhoMedia,
    buscarMediasEmTempoRealDesempenho
};