CREATE VIEW viewCpu AS
SELECT
    Dado_Capturado,
    Hora_captura as hora,
    fkEmpMaqCompMoni,
    fkCompMonitorados
FROM
    monitoramento where fkCompMonitorados = 1;
    
SELECT
    Dado_Capturado as mediaCPU,
    Hora_captura as horaCaptura
FROM monitoramento where fkCompMonitorados = 1 and fkEmpMaqCompMoni = 1;
    
    select * from viewCpu;

 CREATE VIEW viewRam AS
SELECT
    Dado_Capturado,
    Hora_captura as hora,
    fkEmpMaqCompMoni,
    fkCompMonitorados
FROM
    monitoramento where fkCompMonitorados = 2;
    
    select * from monitoramento;
    
    select * from viewRam;
    
    drop view viewCpu;
    drop view viewRam;
    drop view viewDesempenhoMedio;
    
    CREATE VIEW viewDesempenhoMedio AS
SELECT
    tipo,
    CASE
        WHEN tipo = 'TotalMaquinas' THEN total
        ELSE NULL
    END AS totalMaquinas,
    hora,
    fkEmpMaqCompMoni,
    usoMedio,
    usoMax
FROM (
    SELECT
        'TotalMaquinas' AS tipo,
        COUNT(DISTINCT maquina.idMaquina) AS total,
        NULL AS hora,
        NULL AS fkEmpMaqCompMoni,
        NULL AS usoMedio,
        NULL AS usoMax
    FROM Maquinas maquina
    JOIN Componentes_Monitorados componentes ON maquina.idMaquina = componentes.fkMaquina
    JOIN Monitoramento monitoramento ON componentes.idComponente_monitorado = monitoramento.fkCompMonitorados
    WHERE maquina.fkEmpMaq = 1 

    UNION ALL

    SELECT
        'CPU' AS tipo,
        NULL AS total,
        cpu.hora,
        cpu.fkEmpMaqCompMoni,
        cpu.mediaCpu AS usoMedio,
        cpu.maxCpu as usoMax
    FROM (
        SELECT
            fkEmpMaqCompMoni,
            hora,
            AVG(Dado_Capturado) AS mediaCpu,
            MAX(Dado_Capturado) as maxCpu,
            ROW_NUMBER() OVER (PARTITION BY fkEmpMaqCompMoni ORDER BY hora DESC) AS rn
        FROM viewCpu 
        WHERE fkEmpMaqCompMoni = 1
        GROUP BY hora, fkEmpMaqCompMoni
    ) AS cpu
    WHERE cpu.rn = 1
    UNION ALL
    SELECT
        'RAM' AS tipo,
        NULL AS total,
        ram.hora,
        ram.fkEmpMaqCompMoni,
        ram.mediaRam AS usoMedio,
        ram.maxRam as usoMax
    FROM (
        SELECT
            fkEmpMaqCompMoni,
            hora,
            AVG(Dado_Capturado) AS mediaRam,
            MAX(Dado_Capturado) as maxRam,
            ROW_NUMBER() OVER (PARTITION BY fkEmpMaqCompMoni ORDER BY hora DESC) AS rn
        FROM viewRam
        WHERE fkEmpMaqCompMoni = 2
        GROUP BY hora, fkEmpMaqCompMoni
    ) AS ram
    WHERE ram.rn = 1
) AS mergedView;

CREATE VIEW viewDesempenhoMedio AS
SELECT
    tipo,
    CASE
        WHEN tipo = 'TotalMaquinas' THEN total
        ELSE NULL
    END AS totalMaquinas,
    hora,
    fkEmpMaqCompMoni,
    usoMedio,
    usoMax
FROM (
    SELECT
        'TotalMaquinas' AS tipo,
        COUNT(DISTINCT maquina.idMaquina) AS total,
        NULL AS hora,
        NULL AS fkEmpMaqCompMoni,
        NULL AS usoMedio,
        NULL AS usoMax
    FROM Maquinas maquina
    JOIN Componentes_Monitorados componentes ON maquina.idMaquina = componentes.fkMaquina
    JOIN Monitoramento monitoramento ON componentes.idComponente_monitorado = monitoramento.fkCompMonitorados

    UNION ALL

    SELECT
        'CPU' AS tipo,
        NULL AS total,
        cpu.hora,
        cpu.fkEmpMaqCompMoni,
        cpu.mediaCpu AS usoMedio,
        cpu.maxCpu as usoMax
    FROM (
        SELECT
            fkEmpMaqCompMoni,
            hora,
            AVG(Dado_Capturado) AS mediaCpu,
            MAX(Dado_Capturado) as maxCpu,
            ROW_NUMBER() OVER (PARTITION BY fkEmpMaqCompMoni ORDER BY hora DESC) AS rn
        FROM viewCpu 
        WHERE fkEmpMaqCompMoni = 1
        GROUP BY hora, fkEmpMaqCompMoni
    ) AS cpu
    WHERE cpu.rn = 1

    UNION ALL

    SELECT
        'RAM' AS tipo,
        NULL AS total,
        ram.hora,
        ram.fkEmpMaqCompMoni,
        ram.mediaRam AS usoMedio,
        ram.maxRam as usoMax
    FROM (
        SELECT
            fkEmpMaqCompMoni,
            hora,
            AVG(Dado_Capturado) AS mediaRam,
            MAX(Dado_Capturado) as maxRam,
            ROW_NUMBER() OVER (PARTITION BY fkEmpMaqCompMoni ORDER BY hora DESC) AS rn
        FROM viewRam
        WHERE fkEmpMaqCompMoni = 2
        GROUP BY hora, fkEmpMaqCompMoni
    ) AS ram
    WHERE ram.rn = 1
) AS mergedView;


SELECT *
        FROM viewDesempenhoMedio
        WHERE fkEmpMaq IN (
            SELECT fkEmpMaq
            FROM Maquinas
            WHERE fkEmpMaq = 1
         ) limit 2;

select * from viewDesempenhoMedio;

select * from viewDesempenhoMedio WHERE fkEmpMaqCompMoni = 1;
select * from viewDesempenhoMedio WHERE fkEmpMaqCompMoni = 2;
select * from viewDesempenhoMedio WHERE tipo = "TotalMaquinas";