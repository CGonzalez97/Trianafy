import { Router } from 'express';
import { param, body } from 'express-validator';
import {AuthController} from '../controllers/authController';
import {validar} from '../middlewares/validacion';
import {User, UserRepository} from '../modelos/usuario';
import {password, passport} from '../services/passport';

const router = Router();

router.post('/register', [
    body('nombre')
        .isLength({min: 5})
        .withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
    body('nick')
        .isLength({min: 5})
        .withMessage('La longitud mínima del nick de usuario son 5 caracteres'),
    body('password').isLength({min: 8}).withMessage('La contraseña debe tener como mínimoo 8 caracteres'),
    body('email')
        .isEmail()
        .withMessage('El campo email debe ser un email válido')
        .custom(email => {
            if(UserRepository.emailExist(email)) {
                throw new Error('El email ya está registrado. Proporcione un valor diferente');
            } else {  
                return true;
            }
        }),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
AuthController.register);

router.post('/login',
    password(),
    AuthController.login
    );