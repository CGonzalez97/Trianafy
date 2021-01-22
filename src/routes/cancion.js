import { Router } from 'express';
import { param, body } from 'express-validator';
import {CancionController} from '../controllers/cancion';
import {validar} from '../middlewares/validacion';

const router = Router();


router.get('/', CancionController.getCanciones);

router.post('/',
            [body('title').isString().withMessage('El título debe ser una cadena de caracteres.'),
                  body('album').isString().withMessage('El título debe ser una cadena de caracteres.'),
                  body('artist').isString().withMessage('El título debe ser una cadena de caracteres.'),
                  body('year').isDate().withMessage('La fecha debe ser de tipo Fecha.')],
            validar,
            CancionController.crearCancion);


router.get('/:id',
            [param('id').isString().withMessage('El id debe ser una cadena de caracteres.')],
            validar,
            CancionController.getCancion );

router.put('/:id',
            [param('id').isString().withMessage('El id debe ser una cadena de caracteres.'),
            body('title').isString().withMessage('El título debe ser una cadena de caracteres.'),
            body('album').isString().withMessage('El título debe ser una cadena de caracteres.'),
            body('artist').isString().withMessage('El título debe ser una cadena de caracteres.'),
            body('year').isDate().withMessage('La fecha debe ser de tipo Fecha.')],
            validar,
            CancionController.modCancion);

router.delete('/:id',
            [param('id').isString().withMessage('El id debe ser una cadena de caracteres.')],
            validar,
            CancionController.deleteCancion);


export default router;