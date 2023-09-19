import { createResponse } from "../utils.js";


export const checkRole = async (req, res, next) => {

    try {
        const user = req.user
        const userSession = req.session

        console.log('user Checking role: ' + user);
        

        console.log('user Checking role Session: ' + userSession);
        next();

    } catch (error) {
        console.log(error);
        createResponse (res, 403, 'No user admin')
    }

}