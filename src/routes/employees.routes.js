import {Router} from "express";

import {check} from "express-validator";

import {validarCampos} from "../middlewares/validar-campos.js";


import {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee
} from "../controllers/employees.controller.js";

const router = Router();

router.get('/employees', getEmployees);

router.get('/employees/:id', [
    [
        check('id', "El id no es válido").isInt(),
        validarCampos
    ],
], getEmployee);

router.post('/employees',
    [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('salario', 'El salario es requerido').not().isEmpty(),
        check('salario', 'El salario debe ser un número').isNumeric(),
        validarCampos
    ],
    createEmployee);

router.patch('/employees/:id',
    [
        check('id', "El id no es válido").isInt(),
        validarCampos
    ],
    updateEmployee);

router.delete('/employees/:id',
    [
      check('id', "El id no es válido").isInt(),
        validarCampos
    ],
    deleteEmployee);

export default router;