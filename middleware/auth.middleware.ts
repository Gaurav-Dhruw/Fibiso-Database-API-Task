import {Request,Response,NextFunction} from 'express';
import jwt,{JwtPayload, Secret} from 'jsonwebtoken';

type auth=(
    req:Request,
    res:Response,
    next:NextFunction,
)=>void;

interface CustomRequest extends Request {
    user: string | JwtPayload;
}

export const auth:auth = async (req,res,next)=>{
    try{

        if(req.originalUrl==='/api/auth/signup' || req.originalUrl==='/api/auth/login'){
            return next();
        }

        const token:string|undefined = req.headers.authorization?.split(' ')[1];
    
        if(!token) throw new Error();
    
    
        const decoded = jwt.verify(token,process.env.SECRET_KEY as Secret);
        (req as CustomRequest).user = decoded;
        next();
    }
    
    catch(err){
        res.status(401).json({message:'Not Authorized'});
    }
        
    
}

