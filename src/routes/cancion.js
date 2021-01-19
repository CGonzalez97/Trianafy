import { Router } from 'express';
import {CancionController} from '../controllers/cancion';

const router = Router();

/*
router.get('/songs', CancionController.getCanciones());
router.post('/songs', );
router.get('/songs/{id}', );
router.put('/songs/{id}', );
router.delete('/songs/{id}', );
*/

router.get('/', CancionController.getCanciones);
router.post('/', );
router.get('/{id}', );
router.put('/{id}', );
router.delete('/{id}', );


export default router;