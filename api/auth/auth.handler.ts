import { Request, Response } from "express";
import { createUser, checkRegistration, verifyAndGetUser } from "./auth.service";
import { generateToken } from "../../util/generateToken";



export const loginUser = async (req:Request,res:Response):Promise<void>=>{
    try{
        const {email,password} = req.body;
        if(!await checkRegistration(email)) throw new Error("Email Not Registered");

        let user = await verifyAndGetUser(req.body);
        user.token = await generateToken(user);
        res.status(200).json(user);
        
    }catch(err:any){
        res.status(400).json({message:err.message});
    }
}

export const registerUser= async (req:Request,res:Response)=>{
    try{
        const {email,name,password} = req.body;

        if(await checkRegistration(email)) throw new Error("Already Registered");
        
        let user = await createUser(req.body);
        user.token = await generateToken(user);
        res.status(201).json(user);

    }catch(error:any){
        res.status(400).json({message:error.message})
    }
}