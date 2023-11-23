USE master;
GO

 DROP DATABASE centrix;


CREATE DATABASE centrix;
GO

use centrix;
GO

CREATE TABLE Niveis_de_Acesso (
    idNivel_Acesso INT PRIMARY KEY IDENTITY(1,1),
    tipo_acesso VARCHAR(45),
    descricao VARCHAR(600)
);

INSERT INTO Niveis_de_Acesso (tipo_acesso, descricao)
VALUES
    ('Lílas', 'Tela de Configurações - Visualização e Alteração; HelpDesk - Abertura de chamado; Download do Sistema - Visualizar e Baixar.'),
    ('Magenta', 'Tela Inicial - Visualização; Tela Individual - Visualização Geral; Tela de Alertas e Rede - Visualização; Tela de Configurações - Visualização e Alteração; Tela de Gráficos - Visualização;  HelpDesk - Abertura de chamado; Download do Sistema - Visualizar e Baixar.'),
    ('Violeta', 'Tela Inicial - Visualização e Alteração do lugar do computador; Tela Individual - Visualização do seu andar; Tela de Alertas e Rede - Visualização; Tela dos Funcionários - Visualização dos funcionários do seu andar; Tela de Configurações - Visualização e Alteração; Tela de Gráficos - Visualização;  HelpDesk - Abertura de chamado; Download do Sistema - Visualizar e Baixar.'),
    ('Púrpura', 'Tela Inicial - Visualização e Cadastro de andar; Tela Individual - Visualização Geral; Tela de Alertas e Rede - Visualização; Tela dos Funcionários - Visualização, Cadastro e Edição dos Funcionários; Tela de Configurações - Visualização e Alteração; Tela de Gráficos - Visualização;  HelpDesk - Abertura de chamado; Download do Sistema - Visualizar e Baixar.');


CREATE TABLE Empresa (
    idempresa INT PRIMARY KEY IDENTITY(1,1),
    Nome_fantasia VARCHAR(45),
    CNPJ VARCHAR(18),
    Responsavel_legal VARCHAR(45),
    CEP VARCHAR(9),
    numero INT,
    complemento VARCHAR(45)
);

CREATE TABLE Notificacao (
    idNotificacao INT PRIMARY KEY IDENTITY(1,1),
    idDispositivo VARCHAR(36) UNIQUE,
    Funcionario_Solicitante VARCHAR(70),
    fkEmpNot INT,
    CONSTRAINT fkEmpNot FOREIGN KEY (fkEmpNot) REFERENCES Empresa (idempresa)
);

CREATE TABLE Andar_de_trabalho (
    idAndar_de_trabalho INT PRIMARY KEY IDENTITY(1,1),
    num_andar INT,
    foto_andar VARCHAR(255),
    fkEmpAndar INT,
    CONSTRAINT fkEmpAndar FOREIGN KEY (fkEmpAndar) REFERENCES Empresa (idempresa)
);

CREATE TABLE Funcionario (
    idfuncionario INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(70),
    email VARCHAR(70),
    senha VARCHAR(45),
    notificacao VARCHAR(70),
    fkEmpFunc INT,
    CONSTRAINT fk_EmpFunc FOREIGN KEY (fkEmpFunc) REFERENCES Empresa (idempresa),
    fkNivelAcesso INT,
    CONSTRAINT fk_Nivel_Acesso FOREIGN KEY (fkNivelAcesso) REFERENCES Niveis_de_Acesso (idNivel_Acesso),
    fkAndar INT,
    CONSTRAINT fk_andar FOREIGN KEY (fkAndar) REFERENCES Andar_de_trabalho (idAndar_de_trabalho)
);

CREATE TABLE Maquinas (
    idMaquina INT IDENTITY(1,1) PRIMARY KEY,
    Sistema_Operacional VARCHAR(45),
    Id_do_dispositivo VARCHAR(16) UNIQUE,
    posicaoX INT,
    posicaoY INT,
    fkEmpMaq INT,
    CONSTRAINT fk_EmpMaq FOREIGN KEY (fkEmpMaq) REFERENCES Empresa (idempresa),
    fkAndarDeTrabalho INT,
    CONSTRAINT fk_Andar_De_Trabalho FOREIGN KEY (fkAndarDeTrabalho) REFERENCES Andar_de_trabalho (idAndar_de_trabalho)
);
 

CREATE TABLE ComponentesQuePrestamosServico (
    idComponentes_Que_PrestamosServicos INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(45)
);

CREATE TABLE Componentes_Monitorados (
    idComponente_monitorado INT PRIMARY KEY IDENTITY(1,1),
    valor DECIMAL(10,2),
    fkComponentesExistentes INT,
    fkMaquina INT,
    fkEmpMaqComp INT,
    CONSTRAINT fk_ComponentesExistentes FOREIGN KEY (fkComponentesExistentes) REFERENCES ComponentesQuePrestamosServico (idComponentes_Que_PrestamosServicos),
    CONSTRAINT fk_Maquina FOREIGN KEY (fkMaquina) REFERENCES Maquinas (idMaquina) ON DELETE CASCADE,
    CONSTRAINT fk_EmpMaqComp FOREIGN KEY (fkEmpMaqComp) REFERENCES Empresa (idEmpresa)
);


CREATE TABLE Monitoramento (
    idMonitoramento INT PRIMARY KEY IDENTITY(1,1),
    Data_captura DATE,
    Hora_captura TIME,
    Dado_Capturado DECIMAL(10,2),
    fkCompMonitorados INT,
    CONSTRAINT fk_CompMonitorados FOREIGN KEY (fkCompMonitorados) REFERENCES Componentes_Monitorados (idComponente_monitorado) ON DELETE NO ACTION,
    fkCompMoniExistentes INT,
    CONSTRAINT fk_CompMoniExistentes FOREIGN KEY (fkCompMoniExistentes) REFERENCES ComponentesQuePrestamosServico (idComponentes_Que_PrestamosServicos) ON DELETE NO ACTION,
    fkMaqCompMoni INT,
    CONSTRAINT fk_MaqCompMoni FOREIGN KEY (fkMaqCompMoni) REFERENCES Maquinas (idMaquina) ON DELETE NO ACTION,
    fkEmpMaqCompMoni INT,
    CONSTRAINT fk_EmpMaqCompMoni FOREIGN KEY (fkEmpMaqCompMoni) REFERENCES Empresa (idEmpresa) ON DELETE NO ACTION
);


CREATE TABLE Login (
    idLogin INT IDENTITY(1,1),
    idFuncionario INT,
    idMaquina INT,
    idEmpresa INT,
    Email VARCHAR(45),
    Atividade VARCHAR(255),
    Id_do_dispositivo VARCHAR(16),
    dataHoraEntrada DATETIME,
    dataHoraSaida DATETIME,
    PRIMARY KEY (idLogin, idFuncionario, idMaquina, idEmpresa),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario (idfuncionario),
    FOREIGN KEY (idMaquina) REFERENCES Maquinas (idMaquina) ON DELETE CASCADE,
    FOREIGN KEY (Id_do_dispositivo) REFERENCES Maquinas (Id_do_dispositivo),
    FOREIGN KEY (idEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Tipo_Alerta_Parametros (
    idTipo_Alerta INT PRIMARY KEY IDENTITY(1,1),
    Importancia VARCHAR(45)
);

CREATE TABLE Parametros (
    idParametro INT PRIMARY KEY IDENTITY(1,1),
    Componente VARCHAR(45),
    Alcance FLOAT,
    FKTipo_Alerta_Parametros INT,
    FOREIGN KEY (FKTipo_Alerta_Parametros) REFERENCES Tipo_Alerta_Parametros (idTipo_Alerta)
);

CREATE TABLE Tipo_Alerta (
    idTipo_Alerta INT PRIMARY KEY IDENTITY(1,1),
    Importancia VARCHAR(45)
);

CREATE TABLE Alertas (
    idAlertas INT,
    Descricao VARCHAR(100),
    FKTipo_Alerta INT,
    FOREIGN KEY (FKTipo_Alerta) REFERENCES Tipo_Alerta (idTipo_Alerta),
    FKMonitoramento INT,
    FOREIGN KEY (FKMonitoramento) REFERENCES Monitoramento (idMonitoramento)
);

INSERT INTO Empresa (Nome_fantasia, CNPJ, Responsavel_legal, CEP, numero, complemento)
VALUES
   ('Empresa A', '12.345.678/9012-34', 'Responsável A', '12345-678', 123, 'Complemento A'),
('Empresa B', '98.765.432/1098-76', 'Responsável B', '54321-876', 456, 'Complemento B'),
     ('Empresa C', '56.789.012/3456-78', 'Responsável C', '98765-432', 789, 'Complemento C');

INSERT INTO Funcionario (nome, email, senha, fkEmpFunc, fkNivelAcesso)
VALUES
    ('Funcionário 1', 'a', 'b', 1, 4);

INSERT INTO ComponentesQuePrestamosServico (nome) VALUES
    ('CPU'),
    ('DISCO'),
    ('RAM'),
    ('USB'),
    ('Taxa Dowload'),
    ('Taxa Upload'),
    ('Janelas do Sistema'),
    ('Processos');