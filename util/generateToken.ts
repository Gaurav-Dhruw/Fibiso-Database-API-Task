import jwt,{Secret} from 'jsonwebtoken';

export const generateToken = (user:any):string=>{
    const {id,name,email} = user;
    const token = jwt.sign({id,name,email},process.env.SECRET_KEY as Secret);
    return token;
}