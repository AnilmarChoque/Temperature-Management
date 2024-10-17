CREATE DATABASE gerenciamentoTemperatura;
USE gerenciamentoTemperatura;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cpnj VARCHAR(14)
);

CREATE TABLE funcionario(
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(200),
    senha VARCHAR(45),
    fkEmpresa INT REFERENCES empresa(idEmpresa)
);

CREATE TABLE sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	equipmentId VARCHAR(8),
	timestamp DATE,
	value DECIMAL(5,2),
	fkEmpresa INT REFERENCES empresa(idEmpresa)
);

INSERT INTO empresa (nome, cpnj) VALUES("Petrobrás", "33000167000101");
INSERT INTO funcionario (nome, email, senha, fkEmpresa) VALUES ("Lucas", "lucas@petrobras.com", "P3TR0BR45", 1);
