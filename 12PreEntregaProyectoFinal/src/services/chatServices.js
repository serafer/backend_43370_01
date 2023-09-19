import { createChat, getChat } from "../persistance/daos/mongodb/chatDaoMongo.js";

export const getChatService = async () => {

    try {
        const chat = await getChat()
        return chat
    } catch (error) {
        console.log(error);
    }
}

export const createService = async (obj) => {
    try {
        const message = {}
        message.user = obj.username
        message.message = obj.message
        const response = await createChat(message);
        return response;
    } catch (error) {
        console.log(error);
    }
}