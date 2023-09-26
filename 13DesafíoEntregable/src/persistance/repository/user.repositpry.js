import currentUserResDTO from "../DTOs/user.res.dto.js";
import { UserModel } from "../daos/mongodb/models/userModel.js";



export const getByIdDTO = async (id) => {
    try {
        const response = await UserModel.findById(id);

        //console.log('response from userRepository prev DTO: ' + response);
        return new currentUserResDTO(response)
    } catch (error) {
        console.log(error);
    }
}