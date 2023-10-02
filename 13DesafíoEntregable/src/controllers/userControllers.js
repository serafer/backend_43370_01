import { getUserByEmail, getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import {
  mailOptionsGmailLoginOk,
  transporterGmail,
} from "../services/emailServices.js";
import {
  createUsersMockService,
  currentUserResDTOService,
  getAllService,
  getUsersMocksService,
  loginUserServices,
} from "../services/userServices.js";
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse();
import error from "../utils/errors.dictionary.js";





export const logoutUserC = (req, res) => {
  //req.session.destroy();
  res.clearCookie("token");
  res.redirect("/login");
};

export const loginApi = async (req, res) => {
  try {
    const token = await loginUserServices(req.body);

    if (!token) return httpResponse.Unauthorized(res, error.USER_CREDENTIALS)

    res.cookie("token", token, { httpOnly: true });

    const email = req.body.email;

    const name = await getUserByEmail(email);

    const response = await transporterGmail.sendMail(
      mailOptionsGmailLoginOk(email, name)
    );

    //console.log(response.envelope);
    //res.header("Authorization", token);

    return httpResponse.Ok(res, { token })


  } catch (error) {
    console.log(error);
  }
};


export const login = async (req, res) => {
  try {
    const token = await loginUserServices(req.body);

    if (!token) return httpResponse.Unauthorized(res, error.USER_CREDENTIALS)

    res.cookie("token", token, { httpOnly: true });

    const email = req.body.email;

    const name = await getUserByEmail(email);

    const response = await transporterGmail.sendMail(
      mailOptionsGmailLoginOk(email, name)
    );

    //console.log(response.envelope);
    //res.header("Authorization", token);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/products?page=1");

  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const data = await getAllService();
    return httpResponse.Ok(res, data)
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

// MOCKS //

export const createUserMocks = async (req, res, next) => {
  try {
    const { cant } = req.query;
    const response = await createUsersMockService(cant);
    if (!response) return httpResponse.NotFound(res, error.USER_EXISTS)
    else return httpResponse.Ok(res, response)
  } catch (error) {
    next(error.message);
  }
};

export const getUsersMocks = async (req, res, next) => {
  try {
    const response = await getUsersMocksService();
    if (!response) return httpResponse.NotFound(res, error.USER_NOT_FOUND)
    else return httpResponse.Ok(res, response)
  } catch (error) {
    next(error.message);
  }
};
