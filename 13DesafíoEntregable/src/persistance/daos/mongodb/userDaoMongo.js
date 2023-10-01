import { createHash, isValidPassword } from "../../../utils.js";
import { createCart, createCartTestMocks } from "./cartDaoMongo.js";
import { UserModel } from "./models/userModel.js";

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
        console.log(`User ${newUser.email} created`);
        return newUser;
      } else {
        const newCart = await createCart();

        const newUser = await UserModel.create({
          ...user,
          password: createHash(password),
          cart: [{ CartID: newCart.id }],
        });
        console.log(`User ${newUser.email} created`);
        return newUser;
      }
    } else {
      console.log(`The user ${existUser.email} exists`);
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

export const getUserByID = async (id) => {
  try {
    const userExist = await UserModel.findById(id);
    if (userExist) return userExist;
    else return false;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAll = async () => {
  try {
    const response = await UserModel.find({});
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) return userExist;
    else return false;
  } catch (error) {
    throw new Error(error.message);
    throw new Error(error);
  }
};

// FackerJS - Mocks //

import { fakerES_MX as faker } from "@faker-js/faker";
import { UserModelMocks } from "./models/userModel_Mocks.js";


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
    throw new Error(error.message);
  }
};



export const getUsersMocks = async () => {
  try {
    return await UserModelMocks.find({});
  } catch (error) {
    throw new Error(error.message);
  }
};
