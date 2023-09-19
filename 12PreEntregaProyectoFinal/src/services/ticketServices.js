import { generateTicket } from "../persistance/daos/mongodb/ticketDaoMongo.js";

export const generateTicketService = async (userID) => {
    try {
        const ticket = await generateTicket (userID)
         if (!ticket) {return false;}
         else {return ticket}
        
    } catch (error) {
        console.log(error);
    }
}
