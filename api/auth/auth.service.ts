import prisma from "../../lib/prisma.client";
import bcrypt from 'bcrypt';

type createUser = (obj:{ name: string, email: string, password: string }) => any;


export const createUser:createUser = async ({name,email,password})=>{
    const hashed_password = await bcrypt.hash(password,10);
    const data = await prisma.user.create({
        data:{
            name,
            email,
            password:hashed_password
        },
        select:{
            id:true,
            name:true,
            email:true,
        }
    });
    return data;
}

export const checkRegistration = async (email:string):Promise<boolean> => {
    const user = await prisma.user.findUnique({where:{email}});
    return user===null?false:true;
}

export const verifyAndGetUser = async ({email,password}:{email:string,password:string}):Promise<any> => {
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    });
    
    const verified = await bcrypt.compare(password,user.password);

    if(verified) return {email,name:user.name,id:user.id} ;
    else throw new Error("Invalid Password");
}