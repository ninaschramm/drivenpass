import * as authServices from "../services/authServices";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export async function createUser(req: Request, res: Response){
    const { email, password } = req.body;
    const ROUNDS = Number(process.env.ROUNDS);
    const crypted = bcrypt.hashSync(password, ROUNDS);

    try {    
        await authServices.createUser(email, crypted);
        return res.sendStatus(201);
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500);
    }
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    
    try {
       const user = await authServices.signIn(email);
       console.log(user)
      if (!bcrypt.compareSync(password, user.password) || user === undefined || user === null) {
       res.status(401).send("E-mail ou senha estão errados")
      }
      else {
        const expire = {expiresIn: 60*60*3};
        const data = {
            id: user.id,
            email: user.email
        }
        const token = jwt.sign(data, process.env.TOKEN_SECRET, expire);
        return res.status(200).send({token, userId: user.id});
      }
    }
    catch {
        console.error();        
    }
}