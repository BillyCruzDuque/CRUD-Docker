import {Router} from 'express';
import {check} from 'express-validator';
import {validarCampos} from '../middlewares/validar-campos.js';
import {validarJwt} from '../middlewares/validar-jwt.js';

import {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee
} from '../controllers/employees.controller.js';

import {existeUsuarioId, empleadoExiste} from '../helpers/db-validators.js';

const router = Router();

router.get('/employees', getEmployees);

router.get(
    '/employees/:id',
    [
        validarJwt,
        check('id', 'El id no es valido').isInt(),
        check('id').custom(existeUsuarioId),
        validarCampos
    ],
    getEmployee
);

router.post(
    '/employees',
    [
        validarJwt,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('salario', 'El salario es requerido').not().isEmpty(),
        check('salario', 'El salario debe ser un número').isNumeric(),
        check('nombre').custom(empleadoExiste),
        validarCampos
    ],
    createEmployee
);

router.patch(
    '/employees/:id',
    [
        validarJwt,
        check('id', 'El id no es válido').isInt(),
        check('id').custom(existeUsuarioId),
        check('nombre').custom(empleadoExiste),
        validarCampos
    ],
    updateEmployee
);

router.delete(
    '/employees/:id',
    [
        validarJwt,
        check('id', 'El id no es válido').isInt(),
        check('id').custom(existeUsuarioId),
        validarCampos
    ],
    deleteEmployee
);

export default router;