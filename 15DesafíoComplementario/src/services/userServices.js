import { generateToken } from "../jwt/auth.js";
import {
  registerUser,
  loginUser,
  getAll,
  createUsersMock,
  getUsersMocks,
  resetPass,
  updatePass,
} from "../persistance/daos/mongodb/userDaoMongo.js";
import { getByIdDTO } from "../persistance/repository/user.repositpry.js";
import { logger } from "../utils/logger.js";
import { sendGmail } from "./emailServices.js";

export const registerUserService = async (user) => {
  try {
    const newUser = await registerUser(user);
    return newUser;
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};

export const loginUserServices = async (user) => {
  try {
    const userExist = await loginUser(user);
    if (userExist) {
      return generateToken(userExist);
    } else return false;
  } catch (error) {
    logger.error('Error Service:' + error.message);
  }
};

export const getAllService = async () => {
  try {
    const cart = await getAll();
    if (!cart) {
      return false;
    } else {
      return cart;
    }
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};

export const currentUserResDTOService = async (id) => {
  try {
    const response = await getByIdDTO(id);
    //logger.debug('response from userService post DTO: ' + response);
    if (!response) return false;
    return response;
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};

export const resetPassService = async (user) => {
  try {
    const token = await resetPass(user);
    if (!token) return false;
    return await sendGmail(user, "resertPass", token);
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};

export const updatePassService = async (user, password) => {
  try {
    return await updatePass (user, password);
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};

//  MOCKS  //

export const createUsersMockService = async (user) => {
  try {
    const newUser = await createUsersMock(user);
    return newUser;
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};

export const getUsersMocksService = async () => {
  try {
    const cart = await getUsersMocks();
    if (!cart) {
      return false;
    } else {
      return cart;
    }
  } catch (error) {
    logger.error("Error Service:", error.message);
  }
};
