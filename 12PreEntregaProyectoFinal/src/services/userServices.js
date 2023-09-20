import { generateToken } from "../jwt/auth.js";
import {registerUser, loginUser } from "../persistance/daos/mongodb/userDaoMongo.js";
import { getByIdDTO } from "../persistance/repository/user.repositpry.js";

export const registerUserService = async (user) => {

    try {
        const newUser = await registerUser(user);
        return newUser
    } catch (error) {
        console.log(error);
    }
}

export const loginUserServices = async (user) => {
  try {
    const userExist=await loginUser(user)
    if(userExist)return generateToken(userExist)
    else return false
} catch (error) {
    console.log(error);
}
};


export const currentUserResDTOService = async (id) => {

        try {
            const response = await getByIdDTO (id)
            //console.log('response from userService post DTO: ' + response);
            if(!response)return false
            return response
    } catch (error) {
        console.log(error);
 

    }}