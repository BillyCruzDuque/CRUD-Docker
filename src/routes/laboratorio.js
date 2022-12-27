import Router from 'express';
import {postTipoMuestra} from "../controllers/laboratorio.controller.js";


const router = Router();


router.post(
    '/laboratorio',
    postTipoMuestra
)

export default router;