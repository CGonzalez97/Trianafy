import { Router } from 'express';
import { ListaController} from '../controllers/listaReproduccion';
import {AuthController} from '../controllers/authController';
import {param,body} from 'express-validator';
import {validar} from '../middlewares/validacion';
import {token} from '../services/passport';

const router = Router();

/*
Implementar ruta /publicas que muestre las lista publicas con ListaRepo.findAll(),
para esto habría que anyadir otro método al controlador que lo use, además
habría que añadir el atributo privada o pública en el modelo Lista, sería booleano
*/
//router.get('/',token(), ListaController.getListas);//Aqui iría get listasPrivadas que falta por implementar con el ListRepo.findManyWithUserId
router.get('/', token(), ListaController.getListas);

router.get('/publicas', token(), ListaController.getPublicas);

router.post('/',
    token(),
    [body('name').exists().withMessage('El nombre de la lista es un campo requerido.'),
    body('publica').exists().withMessage('El atributo publica es un campo requerido.'),
    body('name').isString().withMessage('El nombre de la lista debe ser una cadena decaracteres.'),
    body('publica').isBoolean().withMessage('El atributo publica debe ser booleano.'),
    body('description').isString().withMessage('El descripción de la lista debe ser una cadena decaracteres.')],
    validar,
    ListaController.crearLista);

router.get('/:id',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getLista);

router.put('/:id',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    body('name').isString().withMessage('El nombre de la lista debe ser una cadena decaracteres.'),
    body('description').isString().withMessage('El descripción de la lista debe ser una cadena decaracteres.'),
    body('publica').isBoolean().withMessage('El atributo publica debe de ser booleano.')],
    validar,
    ListaController.modLista);

router.delete('/:id',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.deleteLista);

router.get('/:id/songs',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getCanciones);

router.post('/:id/songs/:idC',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('idC').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.addCancion);

router.get('/:id/songs/:idC',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('idC').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.getCancion);

router.delete('/:id/songs/:idC',//Aqui haría falta el middleware esPropietario de AuthController
    token(),
    AuthController.esPropietario,
    [param('id').exists().withMessage('El id es un campo requerido.'),
    param('idC').exists().withMessage('El id es un campo requerido.'),
    param('id').isString().withMessage('El id debe de ser una cadena de caracteres.'),
    param('idC').isString().withMessage('El id debe de ser una cadena de caracteres.')],
    validar,
    ListaController.deleteCancion);

export default router;