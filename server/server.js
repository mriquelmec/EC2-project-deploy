import express from 'express';
import { config } from 'dotenv';
import { errorHandler } from './src/middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import conectarDB from './config/mongoose.config.js';
import cors from 'cors';
import petRouter from './src/routes/pet.routes.js';


config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(morgan('tiny'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use('/pet', petRouter);

conectarDB();

app.listen(port, () => {
    console.log(`El servidor está activo en el puerto: ${port}`);
})


