import { Router } from 'express';
import { ListaController} from '../controllers/listaReproduccion';

const router = Router();


router.get('/', ListaController.getListas);
router.post('/', ListaController.crearLista);
router.get('/:id', ListaController.getLista);
router.put('/:id', ListaController.modLista);
router.delete('/:id', ListaController.deleteLista);

router.get('/{idL}/songs', );
router.post('/{idL}/songs/{idS}', );
router.get('/{idL}/songs/{idS}', );
router.delete('/{idL}/songs/{idS}', );

export default router;