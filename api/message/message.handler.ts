import { Request,Response } from "express";
import * as messageService from './message.service'
 
type handler= (
    req:any,
    res:Response
)=>Promise<void>;

export const getMessages: handler = async (req,res)=>{
    try{
        const chatId = req.params.chatId;
        const messages =await messageService.findMessages(chatId);
        res.status(200).json(messages);
    }catch(err:any){
        res.status(400).json({message:err.message})
    }
}
export const postMessage: handler = async (req,res)=>{
    try{
        req.body.senderId = req.user.id;

        const message =  await messageService.createMessage(req.body);
        res.status(201).json(message);
    }catch(err:any){
        res.status(400).json({message:err.message})
    }
}
export const deleteMessage: handler = async (req,res)=>{
    try{
        await messageService.deleteMsg(req.params.messageId);
        res.sendStatus(204);
    }catch(err:any){
        res.status(400).json({message:err.message})
    }
}