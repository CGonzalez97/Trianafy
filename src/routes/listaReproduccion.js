import { Router } from 'express';
import { ListaController} from '../controllers/listaReproduccion';
import { Router } from 'express';
import {param,body} from 'express-validator';
import {validar} from '../middlewars/validacion';

const router = Router();

router.get('/', ListaController.getListas);

router.post('/',
    [body('name').isString().withMessage('El nombre de la lista debe ser una cadena decaracteres.'),
    body('description').isString().withMessage('El descripción de la lista debe ser una cadena decaracteres.')],
    validar,
    ListaController.crearLista);

router.get('/:id',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getLista);

router.put('/:id',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    body('name').isString().withMessage('El nombre de la lista debe ser una cadena decaracteres.'),
    body('description').isString().withMessage('El descripción de la lista debe ser una cadena decaracteres.')],
    validar,
    ListaController.modLista);

router.delete('/:id',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.deleteLista);

router.get('/:id/songs',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getCanciones);

router.post('/:id/songs/:idC',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.addCancion);

router.get('/:id/songs/:idC',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getCancion);

router.delete('/:id/songs/:idC',
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.deleteCancion);

export default router;