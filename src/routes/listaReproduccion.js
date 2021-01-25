import { Router } from 'express';
import { ListaController} from '../controllers/listaReproduccion';
import {param,body} from 'express-validator';
import {validar} from '../middlewares/validacion';
import {token} from '../services/passport';

const router = Router();

router.get('/',token(), ListaController.getListas);

router.post('/',
    token(),
    [body('name').isString().withMessage('El nombre de la lista debe ser una cadena decaracteres.'),
    body('description').isString().withMessage('El descripción de la lista debe ser una cadena decaracteres.')],
    validar,
    ListaController.crearLista);

router.get('/:id',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getLista);

router.put('/:id',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    body('name').isString().withMessage('El nombre de la lista debe ser una cadena decaracteres.'),
    body('description').isString().withMessage('El descripción de la lista debe ser una cadena decaracteres.')],
    validar,
    ListaController.modLista);

router.delete('/:id',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.deleteLista);

router.get('/:id/songs',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getCanciones);

router.post('/:id/songs/:idC',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.addCancion);

router.get('/:id/songs/:idC',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getCancion);

router.delete('/:id/songs/:idC',
    token(),
    [param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.deleteCancion);

export default router;