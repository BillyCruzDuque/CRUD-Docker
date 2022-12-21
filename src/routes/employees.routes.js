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
        check('nombre', 'Name is required').not().isEmpty(),
        validarCampos
    ],
    createEmployee);

router.patch('/employees/:id', updateEmployee);

router.delete('/employees/:id', deleteEmployee);

export default router;