import { Router } from 'express';
import { param, body } from 'express-validator';
import {CancionController} from '../controllers/cancion';
import {validar} from '../middlewares/validacion';
import {token} from '../services/passport';

const router = Router();


router.get('/',token(), CancionController.getCanciones);

router.post('/',
            token(),
            [body('title').isString().withMessage('El título debe ser una cadena de caracteres.'),
                  body('album').isString().withMessage('El album debe ser una cadena de caracteres.'),
                  body('artist').isString().withMessage('El artista debe ser una cadena de caracteres.'),
                  body('year').isInt().withMessage('La fecha debe ser de tipo Integer.')],
                  body('title').exists().withMessage('El título es un campo requerido.'),
            validar,
            CancionController.crearCancion);


router.get('/:id',
            token(),
            [param('id').exists().withMessage('El id es un campo requerido.'),
            param('id').isString().withMessage('El id debe ser una cadena de caracteres.')],
            validar,
            CancionController.getCancion );

router.put('/:id',
            token(),
            [param('id').exists().withMessage('El id es un campo requerido.'),
            param('id').isString().withMessage('El id debe ser una cadena de caracteres.'),
            body('title').isString().withMessage('El título debe ser una cadena de caracteres.'),
            body('album').isString().withMessage('El título debe ser una cadena de caracteres.'),
            body('artist').isString().withMessage('El título debe ser una cadena de caracteres.'),
            body('year').isInt().withMessage('La fecha debe ser de tipo Fecha.')],
            validar,
            CancionController.modCancion);

router.delete('/:id',
            token(),
            [param('id').isString().withMessage('El id debe ser una cadena de caracteres.'),
            param('id').exists().withMessage('El id es un campo requerido.')],
            validar,
            CancionController.deleteCancion);


export default router;