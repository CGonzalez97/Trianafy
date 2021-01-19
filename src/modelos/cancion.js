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


export const CancionRepo = {

    async save(cancion) {
        let cancionGuardar = new Cancion({title: cancion.title,
        artist: cancion.artist,
        album: cancion.album,
        year: cancion.year});
        const result =  await cancionGuardar.save();
        return result;
    },

    async findAll() {
        const result =  await Cancion.find({}).exec();
        return result;
    }
}