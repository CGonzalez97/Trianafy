import { json } from 'body-parser';
import {Cancion,CancionRepo} from '../modelos/cancion';

export const CancionController ={

    getCanciones: async (req,res) =>{
        /*let cancionPrueba = new Cancion({title: 'Cancion1',
            artist: 'CarlitosBrown',
            album: 'API, calvicie y demás',
            year: new  Date()});
        await CancionRepo.save(cancionPrueba);*/
        let listaCanciones = await CancionRepo.findAll();
        if(listaCanciones != undefined || listaCanciones != null || listaCanciones.lenght <= 0){
            res.json(listaCanciones);//.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    },

    crearCancion : async (req,res)=>{
        let cancionPrueba = new Cancion({title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: new  Date()});
        await CancionRepo.save(cancionPrueba);
        res.status(201).json(cancionPrueba);
    },

    getCancion: async (req,res)=>{
        let cancion = await CancionRepo.findById(req.params.id);
        if(cancion != undefined){
            res.json(cancion);
        }else{
            res.sendStatus(404);
        }
    },

    modCancion: async(req, res)=>{
        let cancionMod = await CancionRepo.updateById(req.params.id,{
            title: req.body.title, 
            artist: req.params.artist, 
            album: req.params.album,
            year: req.params.year});
        if(cancionMod =! undefined){
            res.status(200).json(cancionMod);
        }else{
            res.sendStatus(404);
        }
    },

    deleteCancion: async (req,res)=>{
        await CancionRepo.delete(req.params.id);
        res.sendStatus(200);
    }

    
};