import { createResponse } from "../utils.js";


export const ckeckAdminRole = async (req,res,next) => {
    const { role } = req.user
    if (role !=="admin") return createResponse (res,403, 'Unauthorized' )
    next();

}