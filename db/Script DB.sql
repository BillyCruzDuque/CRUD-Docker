CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE IF NOT EXISTS `empleados`
(
    id INT AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    salario INT NOT NULL,
    primary key (id)
);

select * from empleados;

DESCRIBE empleados;


