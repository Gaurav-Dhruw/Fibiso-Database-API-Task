import express, { Router } from "express";
import { getAllChats,getChat, createGroupChat, addUsers, removeUsers,renameGroupChat } from "./chat.handler";
const router:Router = express.Router();

router.get('/', getAllChats);
router.post('/', getChat);
router.post('/group', createGroupChat);
router.put('/group/users/add',addUsers);
router.put('/group/users/remove', removeUsers);
router.put('/group/rename',renameGroupChat);

export default router;