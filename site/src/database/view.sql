CREATE VIEW viewDesempenhoMedio AS
SELECT
    cpu.hora,
    'CPU' AS recurso,
    cpu.fkEmpMaqCompMoni,
    cpu.mediaCpu AS usoMedio,
    cpu.maxCpu as usoMax
FROM (
    SELECT
        fkEmpMaqCompMoni,
        hora,
        AVG(Dado_Capturado) AS mediaCpu,
        Max(Dado_Capturado) as maxCpu,
        ROW_NUMBER() OVER (PARTITION BY fkEmpMaqCompMoni ORDER BY hora DESC) AS rn
    FROM viewCpu 
    WHERE fkEmpMaqCompMoni = 1
    GROUP BY hora, fkEmpMaqCompMoni
) AS cpu
WHERE cpu.rn = 1
UNION ALL
SELECT
    ram.hora,
    'RAM' AS recurso,
    ram.fkEmpMaqCompMoni,
    ram.mediaRam AS uso,
	ram.maxRam as usoMax
FROM (
    SELECT
        fkEmpMaqCompMoni,
        hora,
        AVG(Dado_Capturado) AS mediaRam,
        Max(Dado_Capturado) as maxRam,
        ROW_NUMBER() OVER (PARTITION BY fkEmpMaqCompMoni ORDER BY hora DESC) AS rn
    FROM viewRam
     WHERE fkEmpMaqCompMoni = 1
    GROUP BY hora, fkEmpMaqCompMoni
) AS ram
WHERE ram.rn = 1;

select * from viewDesempenhoMedio WHERE fkEmpMaqCompMoni = 1;

   CREATE VIEW viewCpu AS
SELECT
    Dado_Capturado,
    Hora_captura as hora,
    fkEmpMaqCompMoni,
    fkCompMonitorados
FROM
    monitoramento where fkCompMonitorados = 1;
    
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