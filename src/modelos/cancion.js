import mongoose from 'mongoose';
const { Schema } = mongoose;

export const cancionSchema = new Schema({
    //id:String,
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
    },

    async findById(id) {
        // const posicion = indexOfPorId(id);
        // return posicion == -1 ? undefined : users[posicion];
        const result = await Cancion.findById(id).exec();
        return result != null ? result : undefined;
    },

    async updateById(id, cancionMod) {

        // const posicionEncontrado = indexOfPorId(id)
        // if (posicionEncontrado != -1) {
        //    users[posicionEncontrado].username = modifiedUser.username;
        // }
        // return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
        const cancionSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(cancionSaved, cancionMod).save();
        } else
            return undefined;


    },

    update(cancionMod) {
        return this.updateById(cancionMod.id, cancionMod);
    },

    async delete(id) {
        // const posicionEncontrado = indexOfPorId(id);
        // if (posicionEncontrado != -1)
        //     users.splice(posicionEncontrado, 1);
        await Cancion.findByIdAndRemove(id).exec();
    }


}