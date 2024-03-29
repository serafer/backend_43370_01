import * as service from '../services/chatServices.js'

export const getChat = async (req, res, next) => {

try {
    const chat = await service.getChatService()

//test
//res.render('chat')


res.status (200) .json(chat)



} catch (error) {
    console.log(error);
}

}

export const createChat = async (req, res, next) => {

try {

    const chat = req.body
    const newChat = await service.createChat (chat)

    if (!newChat) throw new Error("Message could not be created.");


    const io = req.app.get("io");
    const messages = await service.getChat();
    io.emit("chat:messages", messages);
    res.json(messages)
    
} catch (error) {
    console.log(error);
}

}