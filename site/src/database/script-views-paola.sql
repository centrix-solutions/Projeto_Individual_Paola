CREATE VIEW viewDesempenhoMedio AS
SELECT
    tipo,
    usoMedio,
    usoMax,
    fkCompMoniExistentes,
    fkEmpMaqCompMoni
FROM (
    SELECT
        'CPU' AS tipo, 
        cpu.mediaCpu AS usoMedio,
        cpu.maxCpu AS usoMax,
        cpu.fkCompMoniExistentes,
        cpu.fkEmpMaqCompMoni
    FROM (
        SELECT
            AVG(Dado_Capturado) AS mediaCpu,
            MAX(Dado_Capturado) AS maxCpu,
            fkCompMoniExistentes,
            fkEmpMaqCompMoni,
            ROW_NUMBER() OVER (PARTITION BY fkCompMoniExistentes ORDER BY hora DESC) AS rn
        FROM viewCpu 
        WHERE fkCompMoniExistentes = 1 
        GROUP BY hora, fkCompMoniExistentes, fkEmpMaqCompMoni
    ) AS cpu
    WHERE cpu.rn = 1

    UNION ALL

    SELECT
        'RAM' AS tipo,
        ram.mediaRam AS usoMedio,
        ram.maxRam AS usoMax,
        ram.fkCompMoniExistentes,
        ram.fkEmpMaqCompMoni
    FROM (
        SELECT
            AVG(Dado_Capturado) AS mediaRam,
            MAX(Dado_Capturado) AS maxRam,
            fkCompMoniExistentes,
            fkEmpMaqCompMoni,
            ROW_NUMBER() OVER (PARTITION BY fkCompMoniExistentes ORDER BY hora DESC) AS rn
        FROM viewRam
        WHERE fkCompMoniExistentes = 3
        GROUP BY hora, fkCompMoniExistentes, fkEmpMaqCompMoni
    ) AS ram
    WHERE ram.rn = 1
) AS mergedView;

select * from viewDesempenhoMedio where fkEmpMaqCompMoni = 1;

SELECT COUNT(*) AS TotalMaquinas FROM Maquinas WHERE fkEmpMaq = 1;