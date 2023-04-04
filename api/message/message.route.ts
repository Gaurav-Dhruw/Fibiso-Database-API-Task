import express, { Router } from "express";
import * as messageHandler from "./message.handler";
const router:Router = express.Router();


router.get('/:chatId', messageHandler.getMessages);
router.post('/', messageHandler.postMessage);
router.delete('/:messageId', messageHandler.deleteMessage);

export default router;