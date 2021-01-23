import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import {User, UserRepository} from '../models/usuario';
import { JwtService } from '../services/jwt';

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false
},(email, password, done)=> {
    const user = UserRepository.findByEmail(email);
    if (user == undefined)
        return done(null, false); // El usuario no existe
    else if (!bcrypt.compareSync(password, user.password))
        return done(null, false); // No coincide la contraseña
    else
        return done(null, UserRepository.toDto(user));
}));


//Estrategia JWT

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
    algorithms : [process.env.JWT_ALGORITHM]
};

passport.use('token', new JwtStrategy(opts, (jwt_payload, done)=>{

    // Extraemos el id del campo sub del payload
    const user_id = jwt_payload.sub;

    // Buscamos el usuario por ID
    const user = UserRepository.findById(user_id);
    if (user == undefined)
        return done(null, false); // No existe el usuario
    else
        return done(null, user);
}));


export const password = () => (req, res, next) =>
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err)
            return res.status(400).json(err)
        else if (err || !user)
            return res.status(401).end()
        
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next);

export default passport;
