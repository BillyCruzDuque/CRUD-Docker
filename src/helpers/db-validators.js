import {pool} from '../db.js';

export const empleadoExiste = async (nombre = '') => {
    const [rows] = await pool.query('SELECT * FROM empleados WHERE nombre = ?', [nombre]);
    if (rows.length > 0) {
        throw new Error(`Empleado ya registrado: ${nombre}`);
    }
};

export const emailExiste = async (email = '') => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0)
        throw new Error(`Email ya registrado: ${email}`);
};

export const existeUsuarioId  = async (id = '') => {
    const [rows] = await pool.query('SELECT * FROM empleados WHERE id = ?', [id]);
    if (rows.length <= 0)
        throw new Error(`El id no existe: ${id}`);
};

