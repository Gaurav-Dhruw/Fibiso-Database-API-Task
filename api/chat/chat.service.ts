import prisma from "../../lib/prisma.client";


export const findAllChats = async (id:string):Promise<any>=>{
    return await prisma.user.findUnique({
        where:{
            id
        },
        select:{
            chats:{
                orderBy:{
                    updatedAt:'desc'
                },
                include:{
                    group:true
                }
            },
        }
    });
}

export const findChat = async(users:string[]):Promise<any>=>{

    return await prisma.chat.findFirst({
        where:{
            users:{
                every: {
                    id: { in: users }
                },
            },
        }
    })
}

export const createChat = async(data:{users:string[], chatName?:string})=>{
    const {users, chatName} = data;

    if(chatName){
        return await prisma.chat.create({
            data:{
                users:{
                    connect:users.map((id)=>({id}))
                },
                group:{
                    create:{
                        chatName
                    }
                }
            },
            include:{
                group:true
            }
        })
    }
    return await prisma.chat.create({
        data:{
            users:{
                connect:users.map((id: string)=>({id}))
            }
        }
    })
}

export const updateUsers = async (actionType:string,{chatId,users}:{chatId:string,users:string[]}) => {

    if(actionType==="ADD"){
        return await prisma.chat.update({
            where:{id:chatId},
            data:{
                users:{
                    connect: users.map(id => ({id}))
                }
            }
            
        })
    }

    else if(actionType==="REMOVE"){
        return await prisma.chat.update({
            where:{id:chatId},
            data:{
                users:{
                    disconnect: users.map(id => ({id}))
                }
            }
            
        })
    }
}

export const updateGroup =  async (data:{chatId:string,newName:string}) =>{
    const {chatId:id, newName:chatName} = data;
    
    return await prisma.chat.update({
        where:{id},
        data:{
            group:{
                update:{
                    chatName
                }
            }
        },
        include:{
            group:true
        }   
    })
}

