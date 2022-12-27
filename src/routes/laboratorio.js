import Router from 'express';
import {getTipoMuestra, postTipoMuestra} from "../controllers/laboratorio.controller.js";


const router = Router();


router.post(
    '/laboratorio',
    postTipoMuestra
)

router.get(
    '/laboratorio',
    getTipoMuestra
)

export default router;