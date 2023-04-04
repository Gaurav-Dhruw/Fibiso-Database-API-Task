import express, { Router } from "express";
import {registerUser, loginUser} from './auth.handler';
const router:Router = express.Router();



router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;