CREATE VIEW VW_DESEMPENHO_CHART_MEDIA AS
SELECT
    C.data_hora,
    'CPU' AS recurso,
    C.id_maquina,
    C.media_uso_cpu AS uso
FROM (
    SELECT
        id_maquina,
        data_hora,
        AVG(dado_coletado) AS media_uso_cpu,
        ROW_NUMBER() OVER (PARTITION BY id_maquina ORDER BY data_hora DESC) AS rn
    FROM VW_CPU_CHART
    WHERE id_maquina IN (SELECT id_maquina FROM maquina WHERE fk_linhaM = 1)
    GROUP BY id_maquina, data_hora
) AS C
WHERE C.rn = 1
UNION ALL
SELECT
    R.data_hora,
    'RAM' AS recurso,
    R.id_maquina,
    R.media_uso_ram AS uso
FROM (
    SELECT
        id_maquina,
        data_hora,
        AVG(usado) AS media_uso_ram,
        ROW_NUMBER() OVER (PARTITION BY id_maquina ORDER BY data_hora DESC) AS rn
    FROM VW_RAM_CHART
    WHERE id_maquina IN (SELECT id_maquina FROM maquina WHERE fk_linhaM = 1)
    GROUP BY id_maquina, data_hora
) AS R
WHERE R.rn = 1;