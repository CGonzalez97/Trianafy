import { json } from 'body-parser';
import {Lista,ListaRepo} from '../modelos/listaReproduccion';

export const ListaController ={

    getListas: async (req,res) =>{
        let listaListas = await ListaRepo.findAll();
        if(listaListas != undefined || listaListas != null || listaListas.lenght <= 0){
            res.json(listaListas);//.sendStatus(200); -> .status(200) -> ¿necesario?
        }else{
            res.sendStatus(404);
        }
    },

    crearLista : async (req,res)=>{
        let listaPrueba = new Lista({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id
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
            description: req.params.description, 
            user_id: req.params.user_id/*,
            year: req.params.year*/});
        if(listaMod =! undefined){
            res.status(200).json(listaMod);
        }else{
            res.sendStatus(404);
        }
    },

    deleteLista: async (req,res)=>{
        await ListaRepo.delete(req.params.id);
        res.sendStatus(200);
    }  
};