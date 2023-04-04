import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes'
import { auth } from './middleware/auth.middleware';

dotenv.config();
const app: Express = express();

app.use(cors())
app.use(auth);
app.use(express.json());
app.use('/api',routes);

app.listen(process.env.PORT,()=>{
    console.log("Server listening on",process.env.PORT);
})