CREATE DATABASE IF NOT EXISTS db;

show tables;

USE db;

CREATE TABLE IF NOT EXISTS `empleados`
(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    salario INT NOT NULL,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS `usuarios`
(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    estado BOOLEAN DEFAULT 1,
    primary key (id)
);



select * from usuarios;


select * from empleados;

DESCRIBE empleados;


