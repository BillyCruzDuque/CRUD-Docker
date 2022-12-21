import jwt from 'jsonwebtoken';
import {JWT_SECRET, JWT_EXPIRES_IN} from '../config.js';
export const generarJwt = (uid = '') => new Promise ((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    }, (err, token) => {
        if(err) {
            console.log(err);
            reject(err, 'Error inesperado - No se pudo generar el token');
        } else {
            resolve(token);
        }
    });
});
