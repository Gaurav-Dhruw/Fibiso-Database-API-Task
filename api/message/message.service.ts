import prisma from "../../lib/prisma.client"

export const createMessage =async (data:{senderId:string, content: string, chatId:string})=>{

    const {senderId: senderID, chatId: chatID, content}= data;
    
    return await prisma.message.create({
        data:{
            sender:{
                connect:{id:senderID}
            },
            chat:{
                connect:{
                    id:chatID
                }
            },
            content,
        },
        include:{
            sender:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                }
            }
        }
    });
}

export const findMessages = async (chatId:string)=>{
    return prisma.chat.findUnique({
        where:{
            id:chatId
        },
        select:{
            messages:{
                orderBy:{
                    createdAt:'desc'
                },
                include:{
                    sender:{
                        select:{
                            id:true,
                            name:true,
                            email:true,
                        }
                    }
                }
            }
        },
        
        
    })
}

export const deleteMsg = async (messageId:string)=>{
    await prisma.message.delete({
        where:{
            id:messageId
        },
    });
}