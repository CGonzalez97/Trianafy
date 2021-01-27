import { json } from 'body-parser';
import {Lista,ListaRepo} from '../modelos/listaReproduccion';
import {Cancion,CancionRepo} from '../modelos/cancion';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


export const ListaController ={
/*
Este método debería ser para las listas privadas del propio usuario logeado,
habría que añadir otro método para recibir todas las lista públicas
*/
    //Sustituir ListaRepo.findAll() por ListaRepo.findManyWithUserId(req.headers.authorization)
    getListas: async (req,res) =>{
        let listaListas = await ListaRepo.findManyWithUserId(req.headers.authorization);
        if(listaListas != undefined || listaListas != null || listaListas.lenght <= 0){
            res.json(listaListas);//.sendStatus(200); -> .status(200) -> ¿necesario?
        }else{
            res.sendStatus(404);
        }
    },
    getPublicas:async (req,res)=>{
        let listasPublicas = await ListaRepo.findPublicas();
        if(listasPublicas != undefined){
            res.json(listasPublicas);
        }else{
            res.sendStatus(400);
        }
    },

    crearLista : async (req,res)=>{
        let userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).sub;
        let listaPrueba = new Lista({
            name: req.body.name,
            description: req.body.description,
            publica: req.body.publica,
            user_id: userId,
            canciones: []
        });
        await ListaRepo.save(listaPrueba);
        res.status(201).json(listaPrueba);
    },

    getLista: async (req,res)=>{
        let lista = await ListaRepo.findById(req.params.id);
        if(lista != undefined){
            res.json(lista);
        }else{
            res.sendStatus(404);
        }
    },

    modLista: async(req, res)=>{
        let listaMod = await ListaRepo.updateById(req.params.id,{
            name: req.body.name, 
            description: req.body.description
        });
        if(listaMod =! undefined){
            res.status(200).json(listaMod);
        }else{
            res.sendStatus(404);
        }
    },

    deleteLista: async (req,res)=>{
        await ListaRepo.delete(req.params.id);
        res.sendStatus(200);
    } ,
    
    getCanciones: async (req,res)=>{//----------------listaCanciones = listaRepo.obtenerCanciones(req.params.id);
        let listaCanciones = await ListaRepo.obtenerCanciones(req.params.id);
        /*let listaRepro = await ListaRepo.findById(req.params.id);
        if(listaRepro != undefined){
            if(listaRepro.canciones != undefined){
                for(let i of listaRepro.canciones){
                    listaCanciones.push(i);
                }
            }
            
        }*/
        if(listaCanciones != undefined){
            res.json(listaCanciones);
        }else{
            res.sendStatus(400);
        }
        //res.json(listaCanciones);        
    },

    addCancion: async (req,res)=>{
        let cancion = await CancionRepo.findById(req.params.idC);
        let lista = await ListaRepo.findById(req.params.id);
        if(cancion != undefined && cancion != null && lista != undefined && lista != null){
            lista.canciones.push(cancion/*.id*/);
            lista.save();
            res.json(cancion);
        }else{
            res.sendStatus(404);
        }        
    },

    getCancion: async(req,res)=>{
        let cancion;
        let lista = await ListaRepo.findById(req.params.id);
        console.log('-----------------------------------');
        console.log(typeof lista);
        console.log('-----------------------------------');
        for(let i of lista.canciones){
            if(i == req.params.idC){
                cancion = await CancionRepo.findById(i);
            }
        }
        if(cancion == undefined || cancion == null){
            res.sendStatus(404);
        }else{
            res.json(cancion);
        }
    },

    deleteCancion: async (req,res)=>{
        let lista = await ListaRepo.findById(req.params.id);
        let index = lista.canciones.indexOf(req.params.idC);
        if(index == -1){
            res.sendStatus(404);
        }else{
            lista.canciones.splice(index,1);
            ListaRepo.updateById(req.params.id, lista);
            //Lista.updateOne({_id: req.params.id},{$pull:{canciones:{id: req.params.idC}}});
            res.sendStatus(204);
        }
        
        
    }
};