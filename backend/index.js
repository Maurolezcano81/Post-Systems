import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Rutas
import database from './config/database.js';

import UserRoutes from './routes/UserRoutes.js';

app.use('/api', UserRoutes);


app.listen( process.env.SV_PORT, () =>{
  database.connectionDB();
  console.log('Escuchando el puerto '+ process.env.SV_PORT);
});