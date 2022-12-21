import jwt from 'jsonwebtoken';
import {pool} from '../db.js';
import {JWT_SECRET} from '../config.js';


// eslint-disable-next-line consistent-return
export const validarJwt = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token',
        });
    }

    try {
        const { uid } = jwt.verify(token, JWT_SECRET);
        const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [uid]);

        if(result.length <= 0) {
            return res.status(401).json({
                msg: 'Token no valido',
            });
        }

        if(result[0].estado === 0) {
            return res.status(401).json({
                msg: 'Token no valido',
            });
        }


        req.usuario = result[0];
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido',
        });
    }

};

