import {Cancion,CancionRepo} from '../modelos/cancion';

export const CancionController ={

    getCanciones: async (req,res) =>{
        let cancionPrueba = new Cancion({title: 'Cancion1',
            artist: 'CarlitosBrown',
            album: 'API, calvicie y demás',
            year: new  Date()});
        await CancionRepo.save(cancionPrueba);
        let listaCanciones = await CancionRepo.findAll();
        if(listaCanciones != undefined || listaCanciones != null || listaCanciones.lenght <= 0){
            res.json(listaCanciones);//.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
};