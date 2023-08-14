import { createHash, isValidPassword } from "../../utils.js";
import { UserModel } from "./models/userModel.js";

export const registerUser = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);

    if (!existUser) {
      if (password === "adminCod3r123" && email === "adminCoder@coder.com") {
        const newUser = await UserModel.create({
          ...user,
          password: createHash(password),
          role: "admin",
        });
        console.log(`User ${newUser.email} created`);
        return newUser;
      } else {
        const newUser = await UserModel.create({
          ...user,
          password: createHash(password),
        });
        console.log(`User ${newUser.email} created`);
        return newUser;
      }
    } else {
      console.log(`The user ${existUser.email} exists`);
      return false;
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const getUserByID = async (id) => {
  try {
    const userExist = await UserModel.findById(id);
    if (userExist) return userExist;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) return userExist;
    else return false;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const userSession = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
};
