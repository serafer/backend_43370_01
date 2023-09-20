import { getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import { generateTicketService } from "../services/ticketServices.js";
import { createResponse } from "../utils.js";


export const generateTicket = async (req, res, next) =>  {
try {
    
            // const holaSession = await req.session
            // console.log('holaSession = ' + holaSession);
            
            
            // const holaUser = await req.user
            // console.log('holaUser = ' + req.user);

            
            const userID = await getUserByID (req.session.passport.user)
            console.log('userID = ' + userID);

            const userIDtoObject = userID.toObject();
            console.log('userIDtoObject = ' + userIDtoObject);



            
            const { _id } = await req.session;



            console.log('userID is ' + userID);

            console.log('req.session is: ' + req.session.passport.user);
            const ticket = await generateTicketService(_id);
            if(!ticket) createResponse (res, 404, 'Error generating ticket');
            createResponse(res, 200, ticket);

} catch (error) {
    
    console.log(error);
}

}