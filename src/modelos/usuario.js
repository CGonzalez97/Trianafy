import mongoose from 'mongoose';
const { Schema } = mongoose;

export const usuarioSchema = new Schema({
    nombre: String,
    nick:String,
    email: String,
    password:String
});

export const User = mongoose.model('Usuario', usuarioSchema);

export const UserRepository = {
    //Metodos crud, y los findAll, findById y findByUsername
    async save(usuario) {
        let usuarioGuardar = new User({nombre: usuario.nombre,
        nick: usuario.nick,
        email: usuario.email,
        password: usuario.password});
        const result =  await usuarioGuardar.save();
        //console.log(result);
        return result; 
    },

    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },

    async emailExist(emailB){
       return await User.countDocuments({ email: emailB }).exec() > 0;
    },

    async findById(id) {
        // const posicion = indexOfPorId(id);
        // return posicion == -1 ? undefined : users[posicion];
        const result = await User.findById(id).exec();
        return result != null ? result : undefined;
    },

    async findByEmail(emailBuscar){
        return await User.find({email:emailBuscar}).exec();
    },

    async updateById(id, usuarioMod) {

        // const posicionEncontrado = indexOfPorId(id)
        // if (posicionEncontrado != -1) {
        //    users[posicionEncontrado].username = modifiedUser.username;
        // }
        // return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
        const usuarioSaved = await User.findById(id);

        if (usuarioSaved != null) {
            return await Object.assign(usuarioSaved, usuarioMod).save();
        } else{
            return undefined;
        }
    },

    update(usuarionMod) {
        return this.updateById(usuarionMod.id, usuarionMod);
    },

    async delete(id) {
        // const posicionEncontrado = indexOfPorId(id);
        // if (posicionEncontrado != -1)
        //     users.splice(posicionEncontrado, 1);
        await User.findByIdAndRemove(id).exec();
    },

    toDto(usuario){
        return {
            id: usuario.id,
            nombre: usuario.nombre, 
            nick: usuario.nick,
            email: usuario.email
        }
    }
}


