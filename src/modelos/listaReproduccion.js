import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import {cancionSchema} from './cancion';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {Cancion, CancionRepo} from './cancion';
import {User} from './usuario';

export const listaSchema = new Schema({
    name:String,
    description: String,
    publica:Boolean,
    user_id: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    canciones: [{
        type: mongoose.ObjectId,
        ref: 'Cancion'
    }]//[{idC : String}]//[cancionSchema] //Pensar si usar en lugar de esto la referencia junto con la función populate() -> [cancion_id]
});

export const Lista = mongoose.model('Lista', listaSchema);

export const ListaRepo = {

    async save(lista) {
        let listaGuardar = new Lista({
            name: lista.name,
            description: lista.description, 
            user_id: lista.user_id,
            publica: lista.publica
        });
        const result =  await listaGuardar.save();
        return result;
    },

    async findAll() {
        const result =  await Lista.find({}).exec();
        return result;
    },

    async findById(id) {
        // const posicion = indexOfPorId(id);
        // return posicion == -1 ? undefined : users[posicion];
        const result = await Lista.findById(id).exec();
        return result != null ? result : undefined;
    },
    
    async findManyWithUserId(tokenCompleto){
        var authorization = tokenCompleto.split(' ')[1];
        let decoded;
            try {
                decoded = jwt.verify(authorization, process.env.JWT_SECRET);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }
            let userId = decoded.sub;
        const result = await Lista.find({user_id:userId}).populate().exec();
        return result != null ? result : undefined;
    },
    async findPublicas(){
        const result = await Lista.find({publica:true}).populate().exec();
        return result != null ? result : undefined;
    },

    async updateById(id, listaMod) {

        // const posicionEncontrado = indexOfPorId(id)
        // if (posicionEncontrado != -1) {
        //    users[posicionEncontrado].username = modifiedUser.username;
        // }
        // return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
        const listaSaved = await Lista.findById(id);

        if (listaSaved != null) {
            return await Object.assign(listaSaved, listaMod).save();
        } else
            return undefined;


    },

    update(listaMod) {
        return this.updateById(listaMod.id, listaMod);
    },

    async delete(id) {
        // const posicionEncontrado = indexOfPorId(id);
        // if (posicionEncontrado != -1)
        //     users.splice(posicionEncontrado, 1);
        await Lista.findByIdAndRemove(id).exec();
    },

    async obtenerCanciones(id){
        const result = await Lista.findById(id).exec();
        let canciones = [];
        for(let i of result.canciones){
            console.log(i);
            let resultado = await CancionRepo.findById(i);
            if(resultado != undefined){
                canciones.push(resultado);
            }
        }
        //return result != null ? result : undefined;

        return canciones != null ? canciones : undefined;
    }


}