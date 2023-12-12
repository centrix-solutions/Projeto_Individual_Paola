var database = require("../database/config");

function calcular() {
        var instrucao = `SELECT TOP 1 * FROM info_sistema ORDER BY data_hora;`;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao)
}

function obterMetricasTempoReal() {

        var instrucao = `SELECT TOP 10 * FROM metricas_tempo_real ORDER BY data_hora DESC;`;

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao)
}

module.exports = {
    calcular,
    obterMetricasTempoReal
};
