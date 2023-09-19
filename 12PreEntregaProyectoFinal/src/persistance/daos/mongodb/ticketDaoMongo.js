import { TicketModel } from "./models/ticketModel.js";


export const generateTicket = async (userID) => {

    try {
        
        const user = await TicketModel.find(userID);

        console.log('user en ticketDao: ' + user);

        if(!user) return false;
        let amountAcc = 0;
        for (const prod of user.cart) {
            const idProd = prod._id.toString();
            const prodDB = await prodDao.getById(idProd);
            if(prod.quantity <= prodDB.stock){
                const amount = prod.quantity * prodDB.price;
                amountAcc += amount;
            }
        }
        const ticket = await TicketModel.create({
            code: `${Math.random()}`,
            purchase_datetime: new Date().toLocaleString(),
            amount: amountAcc,
            purchaser: user.email
        });
        user.cart = [];
        user.save();
        return ticket;

    } catch (error) {
        console.error(error);
    }
}