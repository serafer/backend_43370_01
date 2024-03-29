import { createHash, isValidPassword } from "../../../utils.js";
import { createCart } from "./cartDaoMongo.js";
import { UserModel } from "./models/userModel.js";
import { logger } from "../../../utils/logger.js";

export const registerUser = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);

    if (!existUser) {
      if (password === "adminCod3r123" && email === "adminCoder@coder.com") {
        const newCart = await createCart();

        const newUser = await UserModel.create({
          ...user,
          password: createHash(password),
          role: "admin",
          cart: [{ CartID: newCart.id }],
        });
        logger.debug(`User ${newUser.email} created`);
        return newUser;
      } else {
        const newCart = await createCart();

        const newUser = await UserModel.create({
          ...user,
          password: createHash(password),
          cart: [{ CartID: newCart.id }],
        });
        logger.debug(`User ${newUser.email} created`);
        return newUser;
      }
    } else {
      logger.warning(`The user ${existUser.email} exists`);
      return false;
    }
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

export const loginUser = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (userExist) {
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return false;
      else return userExist;
    } else {
      return false;
    }
  } catch (error) {
    // logger.fatal('Error DAO: ' + error.message);
  }
};

export const getUserByID = async (id) => {
  try {
    const userExist = await UserModel.findById(id);
    if (userExist) return userExist;
    else return false;
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

export const getAll = async () => {
  try {
    const response = await UserModel.find({});
    return response;
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) return userExist;
    else return false;
  } catch (error) {
    // logger.fatal('Error DAO: ' + error.message);
    // throw new Error(error);
  }
};

export const resetPass = async (user) => {
  try {
    const { email } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) return false;
    return generateToken(userExist, "1h");
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

export const updatePass = async (user, password) => {
  try {
    const isEqual = isValidPassword(password, user);
    if (isEqual) return 'isEqual';
    const newPass = createHash(password);
    return await UserModel.findByIdAndUpdate(user._id, { password: newPass });
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

export const updatePremiumRole = async (id) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) return "USER_NOT_FOUND";

    if (user.role === "admin") return "ADMIN_USER";

    if (user.role === "premium") {
      const updateRole = await UserModel.findByIdAndUpdate(user._id, { role: "user", }, { new: true, });

      return { msg: "The role was update to user: ", updateRole };
    }

    if (user.role === "user") {
      const updateRole = await UserModel.findByIdAndUpdate(user._id, { role: "premium", }, { new: true, });

      return { msg: "The role was update to premium: ", updateRole };
    }
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

// FackerJS - Mocks //

import { fakerES_MX as faker } from "@faker-js/faker";
import { UserModelMocks } from "./models/userModel_Mocks.js";
import { generateToken } from "../../../jwt/auth.js";

export const createUsersMock = async (cant = 50) => {
  try {
    const users = [];
    for (let i = 0; i < cant; i++) {
      const user = await UserModelMocks.create({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: Math.floor(Math.random() * 99),
        password: createHash(faker.internet.password()),
      });

      users.push(user);
    }
    return users;
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};

export const getUsersMocks = async () => {
  try {
    return await UserModelMocks.find({});
  } catch (error) {
    logger.fatal("Error DAO: " + error.message);
  }
};
