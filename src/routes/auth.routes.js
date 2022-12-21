import {Router} from "express";
import {check} from "express-validator";
import {validarCampos} from "../middlewares/validar-campos.js";
import {login} from '../controllers/auth.controller.js';

const router = Router();

router.post(
    '/login',
    [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    login
);

export default router;