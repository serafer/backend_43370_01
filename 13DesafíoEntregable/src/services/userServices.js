import { generateToken } from "../jwt/auth.js";
import {registerUser, loginUser, getAll, createUsersMock, getUsersMocks } from "../persistance/daos/mongodb/userDaoMongo.js";
import { getByIdDTO } from "../persistance/repository/user.repositpry.js";

export const registerUserService = async (user) => {

    try {
        const newUser = await registerUser(user);
        return newUser
    } catch (error) {
        throw new Error(error.message);
    }
}

export const loginUserServices = async (user) => {
  try {
    const userExist=await loginUser(user)
    if(userExist)return generateToken(userExist)
    else return false
} catch (error) {
    throw new Error(error.message);
}
};

export const getAllService = async () => {

    try {
        const cart = await getAll()
        if (!cart) { return false; }
        else { return cart; }
    } catch (error) {
        throw new Error(error.message);
    }
}




export const currentUserResDTOService = async (id) => {

        try {
            const response = await getByIdDTO (id)
            //console.log('response from userService post DTO: ' + response);
            if(!response)return false
            return response
    } catch (error) {
        throw new Error(error.message);
 

    }}




    //  MOCKS  //

    export const createUsersMockService = async (user) => {

        try {
            const newUser = await createUsersMock(user);
            return newUser
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
    
    export const getUsersMocksService = async () => {
    
        try {
            const cart = await getUsersMocks()
            if (!cart) { return false; }
            else { return cart; }
        } catch (error) {
            throw new Error(error.message);
        }
    }