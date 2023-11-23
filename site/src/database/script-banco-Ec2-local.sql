DROP DATABASE IF EXISTS centrix;
CREATE DATABASE IF NOT EXISTS centrix;
USE centrix;


CREATE TABLE IF NOT EXISTS Monitoramento (
	idMonitoramento INT primary key auto_increment,
    Data_captura DATE,
    Hora_captura TIME,
    Dado_Capturado DECIMAL(10,2),
    fkCompMonitorados INT,
    fkCompMoniExistentes INT,
    fkMaqCompMoni INT,
    fkEmpMaqCompMoni INT
);

CREATE TABLE IF NOT EXISTS Login (
    idLogin INT primary key auto_increment,
    Email VARCHAR(45),
    Atividade VARCHAR(255),
    Id_do_dispositivo CHAR(16),
    dataHoraEntrada DATETIME,
    dataHoraSaida DATETIME
);

select * from Login;
select * from monitoramento;
