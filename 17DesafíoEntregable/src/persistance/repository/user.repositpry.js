import currentUserResDTO from "../DTOs/user.res.dto.js";
import { UserModel } from "../daos/mongodb/models/userModel.js";
import { logger } from "../../utils/logger.js";


export const getByIdDTO = async (id) => {
    try {
        const response = await UserModel.findById(id);

        //logger.debug('response from userRepository prev DTO: ' + response);
        return new currentUserResDTO(response)
    } catch (error) {
        logger.error('Error Repository: ' + error.message)
    }
}