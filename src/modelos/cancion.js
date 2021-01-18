import mongoose from 'mongoose';
const { Schema } = mongoose;

export const cancionSchema = new Schema({
    id:String,
    title: String,
    artist: String,
    album: String,
    year: Date
});

export const Cancion = mongoose.model('Cancion', cancionSchema);

/*
class Cancion{
    constructor(id, nombreArtista, album, anyo){
        this.id = id;
        this.nombreArtista = nombreArtista;
        this.album = album;
        this.anyo = anyo;
    }
}
*/