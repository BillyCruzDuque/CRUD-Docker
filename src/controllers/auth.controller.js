import bcryptjs from 'bcryptjs';
import {pool} from '../db.js';
import {response} from 'express';
import {generarJwt} from '../helpers/generar-jwt.js';

export const login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const [row] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (row.length <= 0)
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no son correctos',
            });

        if (row[0].estado === 0)
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no esta activo',
            });

        const validPassword = await bcryptjs.compareSync(password, row[0].password);
        if (!validPassword)
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no son correctos',
            });

        const token = await generarJwt(row[0].id);

        res.status(200).json({
            ok: true,
            msg: 'Login correcto',
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
};