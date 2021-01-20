import { Router } from 'express';
import {CancionController} from '../controllers/cancion';

const router = Router();


router.get('/', CancionController.getCanciones);
router.post('/', CancionController.crearCancion);
router.get('/:id',CancionController.getCancion );
router.put('/:id', CancionController.modCancion);
router.delete('/:id', CancionController.deleteCancion);


export default router;