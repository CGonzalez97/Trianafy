import {User,UserRepository} from '../modelos/usuario';
import {ListaRepo} from '../modelos/listaReproduccion';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
    },

    esPropietario : async (req,res, next)=>{
        let userId;
        //let usuarioLogeado;
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1];
            let decoded;
            try {
                decoded = jwt.verify(authorization, process.env.JWT_SECRET);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
            userId = decoded.id;
            // Fetch the user by id 
            //usuarioLogeado = await findById.findById(userId);
        }
        let lista = ListaRepo.findById(req.params.id);
        if(lista.user_id == userId){
            //return true;
            next();
        }else{
            return res.status(401).send('unauthorized');
        }
        //return usuarioLogeado;
    },

    misDatos: async(req,res,next)=>{
        let userId;
        let usuarioLogeado;
        if (req.headers && req.headers.authorization) {
            var authorization = req.headers.authorization.split(' ')[1];
            console.log(authorization);
            let decoded;
            try {
                decoded = jwt.verify(authorization, process.env.JWT_SECRET);
                console.log(decoded);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
            userId = decoded.sub;//600e9d768c566e08911b26d8
            // Fetch the user by id 
            console.log(userId);
            usuarioLogeado = await UserRepository.findById(userId);
            console.log(typeof usuarioLogeado);
        }
        res.json({
            id: usuarioLogeado.id,
            nombre: usuarioLogeado.nombre,
            nick: usuarioLogeado.nick,
            email: usuarioLogeado.email
        });
    }
}