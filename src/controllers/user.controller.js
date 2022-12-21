import {pool} from '../db.js';
import bcryptjs from 'bcryptjs';

export const register = async (req, res) => {
    const {nombre, email, password} = req.body;
    try {
        const encryptedPassword = bcryptjs.hashSync(password, 10);
        const [result] = await pool.query('INSERT INTO usuarios(nombre, email, password)  values (?, ?, ?)', [nombre, email, encryptedPassword]);
        if (result.affectedRows < 0)
            return res.status(500).json({
                ok: false,
                msg: 'Error al registrar el usuario'
            });

        res.status(200).json({
            ok: true,
            msg: 'Usuario registrado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}