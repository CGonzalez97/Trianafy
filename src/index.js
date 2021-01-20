import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import { param } from 'express-validator';
import mongoose from "mongoose";
import routes from './routes';

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
morganBody(app);

app.use('/songs',routes.cancion);
app.use('/lists',routes.listaReproduccion);
//app.use('/auth',routes.cancion);

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
  if (err) {
    console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
  } else {
    console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
    app.listen(process.env.PORT, () =>
      console.log(
        `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
      )
    );
  }

});