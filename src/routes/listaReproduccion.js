import { Router } from 'express';
import { ListaController} from '../controllers/listaReproduccion';

const router = Router();


router.get('/', ListaController.getListas);
router.post('/', ListaController.crearLista);
router.get('/:id', ListaController.getLista);
router.put('/:id', ListaController.modLista);
router.delete('/:id', ListaController.deleteLista);

router.get('/:id/songs', ListaController.getCanciones);
router.post('/:id/songs/:idC', ListaController.addCancion);
router.get('/:id/songs/:idC', ListaController.getCancion);
router.delete('/:id/songs/:idC', ListaController.deleteCancion);

export default router;