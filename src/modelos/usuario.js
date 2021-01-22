import mongoose from 'mongoose';
const { Schema } = mongoose;

export const usuarioSchema = new Schema({
    id:String,
    nombre: String,
    nick:String,
    email: String,
    contrasenya:String
});

export const User = mongoose.model('Usuario', usuarioSchema);

const UserRepository = {
    //Metodos crud, y los findAll, findById y findByUsername
}

