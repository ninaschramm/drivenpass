import dotenv from "dotenv";
import express, { json, NextFunction } from 'express';
import cors from 'cors';
import { router } from './router/index';

const server = express();

dotenv.config();

server.use(cors());
server.use(json());
server.use(router);


const PORT: number = +process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});