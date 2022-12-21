import {Router} from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validar-campos.js';
import {register} from '../controllers/user.controller.js';
import {emailExiste} from '../helpers/db-validators.js';

const router = Router();

router.post(
    '/user',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
        check('email', 'El email ya existe').custom(emailExiste),
        validarCampos
    ],
    register
);

export default router;