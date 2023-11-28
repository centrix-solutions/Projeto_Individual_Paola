var database = require("../database/config")

function listar() {
    var instrucao = `
    select avg(Dado_Capturado) from monitoramento where fkCompMoniExistentes = ${idEmpresa};
    `;
    return database.executar(instrucao);
}

function buscarUltimasMedidasDesempenhoMedia(idEmpresa, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idEmpresa} 
         );${limite_linhas}
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idEmpresa} 
         );${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediasEmTempoRealDesempenho(idEmpresa) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idEmpresa} 
         ) limit 2;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT *
        FROM VW_DESEMPENHO_CHART_MEDIA
        WHERE id_maquina IN (
            SELECT id_maquina
            FROM maquina
            WHERE fk_linhaM = ${idEmpresa} 
         ) limit 2;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarUltimasMedidasDesempenhoMedia,
    buscarMediasEmTempoRealDesempenho
};