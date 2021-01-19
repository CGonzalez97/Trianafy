import {Cancion} from '../modelos/index';

export const CancionController ={
    getCanciones: (req,res) =>{
        res.json(Cancion.find()).sendStatus(200);
    }
}