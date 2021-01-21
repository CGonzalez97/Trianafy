import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import {cancionSchema} from './cancion';

export const listaSchema = new Schema({
    name:String,
    description: String,
    user_id: String,
    canciones: []//[{idC : String}]//[cancionSchema] //Pensar si usar en lugar de esto la referencia junto con la función populate() -> [cancion_id]
});

export const Lista = mongoose.model('Lista', listaSchema);

export const ListaRepo = {

    async save(lista) {
        let listaGuardar = new Lista({
            name: lista.name,
            description: lista.description,
            user_id: lista.user_id
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
    }


}