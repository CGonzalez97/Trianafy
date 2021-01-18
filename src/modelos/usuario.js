import mongoose from 'mongoose';
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    nombre: String,
    nick:String,
    email: String,
    contrasenya:String
});

const User = mongoose.model('Usuario', usuarioSchema);

