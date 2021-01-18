import mongoose from 'mongoose';
import { Schema } from mongoose;
import {cancionSchema} from './cancion';

const ListaReproduccion = new Schema({
    id: String, /*ObjectId(“asdfq342134eqerwerqw”)*/
    name:String,
    description: String,
    user_id: String, /*ObjectId(“asdfq342134eqerwerqw”)*/
    canciones: [cancionSchema] //Pensar si usar el lugar de esto la referencia junto con la función populate() -> [cancion_id]
});