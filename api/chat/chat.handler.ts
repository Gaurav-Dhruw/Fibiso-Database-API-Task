import { Request,Response} from "express";
import { findAllChats , findChat, createChat, updateUsers, updateGroup} from "./chat.service";

type handler= (
    req:any,
    res:Response
)=>Promise<void>;

export const getAllChats: handler = async (req,res)=>{
    try{

        const chatList = await findAllChats(req.user.id);
        res.status(200).json(chatList);
    }catch(err:any){
        res.status(500).json({message:err.message})
    }
}


export const getChat: handler= async (req,res)=>{
    try{
        req.body.users.push(req.user.id);

        let chat = await findChat(req.body.users);
        if(!chat){
            chat = await createChat(req.body);
        }
        res.status(201).json(chat);

    }catch(err:any){
        res.status(400).json({message:err.message})
    }
}


export const createGroupChat:handler= async (req,res)=>{
    try{
        req.body.users.push(req.user.id);
        const groupChat = await createChat(req.body);
        res.status(201).json(groupChat);
        
    }catch(err:any){
        res.status(400).json({message:err.message})
    }
}


export const addUsers: handler = async (req,res)=>{
    try{
        const updatedGroupChat = await updateUsers("ADD",req.body);
        res.status(201).json(updatedGroupChat);
    }catch(err:any){
        res.status(400).json({message: err.message})
    }
}


export const removeUsers: handler = async (req,res)=>{
    try{
        const updatedGroupChat = await updateUsers("REMOVE",req.body);
        res.status(201).json(updatedGroupChat);
    }catch(err:any){
        res.status(400).json({message: err.message})
    }
}


export const renameGroupChat: handler = async (req,res)=>{
    try{
        const updatedGroupChat = await updateGroup(req.body);
        res.status(201).json(updatedGroupChat);
    }catch(err:any){
        res.status(400).json({message: err.message})
    }
}