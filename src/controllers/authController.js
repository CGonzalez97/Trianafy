import {User,UserRepository} from '../modelos/usuario';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

export const AuthController = {

    register: async (req, res, next) => {

        let usuarioCreado = await UserRepository.save(
            new User({
                nombre: req.body.nombre,
                nick: req.body.nick,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))//req.body.password
            })
        );
        console.log(usuarioCreado); 
        res.status(201).json({
            id: usuarioCreado.id,
            nick: usuarioCreado.nick,
            email: usuarioCreado.email,
            nombre: usuarioCreado.nombre
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