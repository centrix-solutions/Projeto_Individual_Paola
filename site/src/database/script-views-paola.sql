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
        AVG(Dado_Capturado) AS usoMedio,
        MAX(Dado_Capturado) AS usoMax,
        fkCompMoniExistentes,
        fkEmpMaqCompMoni
    FROM viewCpu 
    WHERE fkCompMoniExistentes = 1 
    GROUP BY fkCompMoniExistentes, fkEmpMaqCompMoni

    UNION ALL

    SELECT
        'RAM' AS tipo,
        AVG(Dado_Capturado) AS usoMedio,
        MAX(Dado_Capturado) AS usoMax,
        fkCompMoniExistentes,
        fkEmpMaqCompMoni
    FROM viewRam
    WHERE fkCompMoniExistentes = 3
    GROUP BY fkCompMoniExistentes, fkEmpMaqCompMoni
) AS mergedView;

drop view viewDesempenhoMedio;

select * from viewDesempenhoMedio where fkEmpMaqCompMoni = 1;

select avg(Dado_Capturado) from monitoramento where fkCompMoniExistentes = 1;
select max(Dado_Capturado) from monitoramento where fkCompMoniExistentes = 1;

SELECT COUNT(*) AS TotalMaquinas FROM Maquinas WHERE fkEmpMaq = 1;