import { Router } from 'express';
import {CancionController} from '../controllers/index';

const router = Router();

router.get('/songs', CancionController.getCanciones());
router.post('/songs', /* método controlador */);
router.get('/songs/{id}', /* método controlador */);
router.put('/songs/{id}', /* método controlador */);
router.delete('/songs/{id}', /* método controlador */);



export default router;