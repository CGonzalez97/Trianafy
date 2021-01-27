import { json } from 'body-parser';
import {Cancion,CancionRepo} from '../modelos/cancion';

export const CancionController ={

    getCanciones: async (req,res) =>{
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
            year: req.body.year});
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
        let tituloN;
        let artistN;
        let albumN;
        let yearN;
        let cancion = await CancionRepo.findById(req.params.id);
        if(req.body.title == '' || req.body.title == undefined || req.body.title == null){
            tituloN = cancion.title;
        }else{
            tituloN = req.body.title;
        }
        if(req.body.artist == '' || req.body.artist == undefined || req.body.artist == null){
            artistN = cancion.artist;
        }else{
            artistN = req.body.artist;
        }
        if(req.body.album == '' || req.body.album == undefined || req.body.album == null){
            albumN = cancion.album;
        }else{
            albumN = req.body.album;
        }
        if(req.body.year == undefined || req.body.year == null){
            yearN = cancion.year;
        }else{
            yearN = req.body.year;
        }
        let cancionMod = await CancionRepo.updateById(req.params.id,{
            title: tituloN, 
            artist: artistN, 
            album: albumN,
            year: yearN
        });
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