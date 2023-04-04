import express, { Router } from "express";
import { chatRoute, messageRoute, authRoute } from './api/index'

const router:Router = express.Router();

router.use('/chat',chatRoute);
router.use('/message',messageRoute);
router.use('/auth',authRoute);


export default router;
