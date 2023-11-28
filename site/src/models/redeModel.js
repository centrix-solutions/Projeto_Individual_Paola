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

function alertasAndarMeiaLua(fkAndarDeTrabalho){
    instrucaoSql = ` 
 SELECT 
    SUM(CASE WHEN alertas.FKTipo_Alerta = 1 THEN 1 ELSE 0 END) AS AlertasPerigo,
    SUM(CASE WHEN alertas.FKTipo_Alerta = 2 THEN 1 ELSE 0 END) AS AlertasAtencao,
    (
        SELECT COUNT(idMaquina)
        FROM Maquinas
        WHERE fkAndarDeTrabalho = ${fkAndarDeTrabalho}
    ) AS TotalMaquinas
FROM alertas
JOIN Monitoramento ON alertas.FKMonitoramento = Monitoramento.idMonitoramento
JOIN Componentes_Monitorados ON Monitoramento.FKCompMonitorados = Componentes_Monitorados.idComponente_monitorado
JOIN Maquinas ON Componentes_Monitorados.fkMaquina = Maquinas.idMaquina
WHERE Maquinas.fkAndarDeTrabalho = ${fkAndarDeTrabalho}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertasDoMes(){
    instrucaoSql = `SELECT 
    CASE 
        WHEN DAY(Monitoramento.Data_Captura) BETWEEN 1 AND 7 THEN '01-07'
        WHEN DAY(Monitoramento.Data_Captura) BETWEEN 8 AND 14 THEN '08-14'
        WHEN DAY(Monitoramento.Data_Captura) BETWEEN 15 AND 21 THEN '15-21'
        WHEN DAY(Monitoramento.Data_Captura) BETWEEN 22 AND 31 THEN '22-31'
        ELSE 'Outro'
    END AS Intervalo_Dias,
    SUM(CASE WHEN Alertas.FKTipo_Alerta = 1 THEN 1 ELSE 0 END) AS AlertasPerigo,
    SUM(CASE WHEN Alertas.FKTipo_Alerta = 2 THEN 1 ELSE 0 END) AS AlertasAtencao
FROM Maquinas
JOIN Componentes_Monitorados ON Componentes_Monitorados.FKMaquina = Maquinas.idMaquina
JOIN Monitoramento ON Monitoramento.FKCompMonitorados = Componentes_Monitorados.idComponente_Monitorado
LEFT JOIN Alertas ON Alertas.FKMonitoramento = Monitoramento.idMonitoramento
WHERE YEAR(Monitoramento.Data_Captura) = YEAR(CURDATE()) 
    AND MONTH(Monitoramento.Data_Captura) = MONTH(CURDATE())
GROUP BY Intervalo_Dias`;
console.log("Executando instrução SQL:\n" + instrucaoSql);
return database.executar(instrucaoSql)
}


module.exports = {
   buscarImportanciaMaquina,
   contarMaquinasEmpresa,
   alertasAndarMeiaLua,
   alertasDoMes,
}