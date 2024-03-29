import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmail,
  getUserByID,
  registerUser,
} from "../persistance/daos/mongodb/userDaoMongo.js";
import { loginUserServices } from "../services/userServices.js";
import { HttpResponse } from "../utils/http.response.js"
const httpResponse = new HttpResponse();
import error from "../utils/errors.dictionary.js";
import { mailOptionsGmailLoginOk, transporterGmail } from "../services/emailServices.js";
import { logger } from "../utils/logger.js";

/* opciones - tener en cuenta como los capturamos. ID del form */
const strategyOptions = {
  usernameField: "email",
  passportField: "password",
  passReqToCallback: true,
};

/* lógica de register y login */
const register = async (req, email, password, done) => {
  try {
    const user = await getUserByEmail(email);
    if (user) return done(null, false);
    const newUser = await registerUser(req.body);
    return done(null, newUser);
  } catch (error) {
    //return done(error, false)
    logger.error('register failed')
  }
};

const login = async (req, email, password, done) => {
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
    logger.error('loging error')
  }
};

// const login = async ( req, email, password, done) => {
//   try {
//     const userData = { email, password };
//     const user = await loginUser(userData);

//     //if (!user) return done(null, false, { message: "Login failed" });

//     if (!user){
//     res.json({msg: 'invalid credentials'});
//   } else {
//       const token = generateToken(user)

//       console.log('token: ' + token);
//       res
//             .header('Authorization', token)

//             //.cookie('token', token, { httpOnly: true })
//            //.json({msg: 'Login OK', token})
//   }
//     return done(null, user);
//   } catch (error) {
//     //return done(error, false)
//     console.log(error);
//   }
// };

/* strategies */
const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

/* inicialización */
passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

/* serialize y deserialize */
//guarda al user en req.session.passport.user
passport.serializeUser((user, done) => {
  done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
  const user = await getUserByID(id);
  return done(null, user);
});
