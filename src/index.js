import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import morganBody from "morgan-body";
import bodyParser from "body-parser";
import { param } from 'express-validator';
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
morganBody(app);

