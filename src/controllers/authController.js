import {User,UserRepository} from '../models/usuario';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

export const AuthController = {

    register: (req, res, next) => {
        // ¿Realmente este método es necesario, o podríamos modificar la petición POST en /users?
        // Mantendremos solamente esta versión, que estará más actualizada
        
        // La comprobación de si el username o el email ya existe la realiza la validación
        // No es necesario hacer nada más aquí.


        let usuarioCreado = UserRepository.save(
            new usuarioCreado({
                nombre: req.body.nombre,
                nick: req.body.nick,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))//req.body.password
            })
        );

        // Devolvemos todos los datos del usuario menos la contraseña                
        res.status(201).json({
            id: usuarioCreado.id,
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    
    login: (req, res, next) => {
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }
}