var database = require("../database/config")

// function listar() {
//     var instrucao = `
//     select avg(Dado_Capturado) from monitoramento where fkCompMoniExistentes = ${idEmpresa};
//     `;
//     return database.executar(instrucao);
// }

function buscarUltimasMedidasDesempenhoMedia(idEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        select * from viewDesempenhoMedio 
        WHERE fkEmpMaqCompMoni = ${idEmpresa} limit 1;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select * from viewDesempenhoMedio 
        WHERE fkEmpMaqCompMoni = ${idEmpresa} limit 1;
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
        select * from viewDesempenhoMedio 
        WHERE fkEmpMaqCompMoni = ${idEmpresa} limit 1;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        select * from viewDesempenhoMedio 
        WHERE fkEmpMaqCompMoni = ${idEmpresa} limit 1;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    // listar,
    buscarUltimasMedidasDesempenhoMedia,
    buscarMediasEmTempoRealDesempenho
};