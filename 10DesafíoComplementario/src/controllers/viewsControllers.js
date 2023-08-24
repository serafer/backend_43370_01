import { getUserByID } from "../daos/mongodb/userDao.js";

export const register = async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error.message);
  }
};

export const errorRegister = async (req, res, next) => {
  try {
    res.render("errorRegister");
  } catch (error) {
    next(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    next(error.message);
  }
};

export const errorLogin = async (req, res, next) => {
  try {
    res.render("errorLogin");
  } catch (error) {
    next(error.message);
  }
};

export const current = async (req, res, next) => {

  try {

    const userExists = await req.session;
    const userID = await getUserByID (req.session.passport.user)
    const user = userID.toObject();

    //console.log('hola: ', user);

    if (userExists) {

      res.render("current", {user});
    }  else {
      res.render("login");
    }  

  } catch (error) {
    next (error.message);
  }

}

