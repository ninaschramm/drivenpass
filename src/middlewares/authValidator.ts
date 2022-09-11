import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import { TokenPayload } from "../types/tokenTypes";

const SECRET = process.env.TOKEN_SECRET;

export async function validateToken (req: Request, res: Response, next: NextFunction){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Invalid token ' });
      }  
       
    try {  
      // verify token hasn't expired yet
      const decodedToken = await validateJWT(token);
      console.log(decodedToken)
      res.locals.id = decodedToken.id;
      next();
    }
    catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Expired token' });
        return;
      }
  
      res.status(500).json({ message: 'Failed to authenticate user' });
    }
}

//   };

    // if(token === null){
    //     return res.sendStatus(401);
    // } 

    
    // jwt.verify(token, SECRET) => {
    //     if(err){
    //         return res.sendStatus(401);
    //     }
    //     else{
    //     res.locals.user = data.id;
    //     next();
    //     }
        
    // });
// };

export function validateJWT(token: string): Promise<TokenPayload> {      
    return new Promise((resolve, reject) => {
      verify(token, SECRET, (error, decoded: TokenPayload) => {
        if (error) return reject(error);  
        resolve(decoded);
      })
    })}