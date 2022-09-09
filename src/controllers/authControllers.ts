import * as authServices from "../services/authServices";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export async function createUser(req:Request, res: Response){
    const { email, password } = req.body;
    const Rounds = Number(process.env.Rounds);
    const crypted = bcrypt.hashSync(password, Rounds);

    try {    
        await authServices.createUser(email, crypted);
        return res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500);
    }
}