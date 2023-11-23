var database = require("../database/config");

function buscarImportanciaMaquina(idMaquina){

    var instrucaoSql = `SELECT Importancia
    FROM Tipo_Alerta  AS TA
    JOIN Alertas AS A ON TA.idTipo_Alerta = A.FKTipo_Alerta
    JOIN Monitoramento AS M ON A.fkMonitoramento = M.idMonitoramento
    JOIN Componentes_Monitorados AS CM ON CM.idComponente_Monitorado = M.fkCompMonitorados
    JOIN Maquinas AS Maq ON CM.fkMaquina = Maq.idMaquina
    WHERE Maq.idMaquina = ${idMaquina}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarMaquinasEmpresa(idEmpresa){
    
    instrucaoSql = `SELECT COUNT(idMaquina) AS totalMaq FROM Maquinas WHERE fkEmpMaq = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperarUltimosAlertasAndarPerigo(fkAndarDeTrabalho){

    instrucaoSql = ` SELECT COUNT(alertas.idAlertas) AS TotalAlertasTipo
    FROM alertas
    JOIN Monitoramento ON alertas.FKMonitoramento = Monitoramento.idMonitoramento
    JOIN Componentes_Monitorados ON Monitoramento.FKCompMonitorados = Componentes_Monitorados.idComponente_monitorado
    JOIN Maquinas ON Componentes_Monitorados.fkMaquina = Maquinas.idMaquina
    WHERE Maquinas.fkAndarDeTrabalho = ${fkAndarDeTrabalho}
    AND alertas.fkTipo_alerta = 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperarUltimosAlertasAndarAtencao(fkAndarDeTrabalho){

    instrucaoSql = ` SELECT COUNT(alertas.idAlertas) AS TotalAlertasTipo
    FROM alertas
    JOIN Monitoramento ON alertas.FKMonitoramento = Monitoramento.idMonitoramento
    JOIN Componentes_Monitorados ON Monitoramento.FKCompMonitorados = Componentes_Monitorados.idComponente_monitorado
    JOIN Maquinas ON Componentes_Monitorados.fkMaquina = Maquinas.idMaquina
    WHERE Maquinas.fkAndarDeTrabalho = ${fkAndarDeTrabalho}
    AND alertas.fkTipo_alerta = 2`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperarTotalMaquinas(fkAndarDeTrabalho){
    
    instrucaoSql = `SELECT COUNT(Maquinas.idMaquina) AS Monitoradas
    FROM Maquinas
    JOIN Componentes_Monitorados ON Componentes_Monitorados.FKMaquina = Maquinas.idMaquina
    JOIN Monitoramento ON Monitoramento.FKCompMonitorados = Componentes_Monitorados.idComponente_Monitorado
    LEFT JOIN Alertas ON Alertas.FKMonitoramento = Monitoramento.idMonitoramento
    WHERE Maquinas.fkAndarDeTrabalho = ${fkAndarDeTrabalho};`
    console.log("Executando instrução SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


module.exports = {
   buscarImportanciaMaquina,
   contarMaquinasEmpresa,
   recuperarUltimosAlertasAndarPerigo,
   recuperarUltimosAlertasAndarAtencao,
   recuperarTotalMaquinas,
}