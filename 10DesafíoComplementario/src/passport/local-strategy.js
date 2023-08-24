import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmail,
  getUserByID,
  loginUser,
  registerUser,
} from "../daos/mongodb/userDao.js";

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
    console.log(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const user = { email, password };
    const userLogin = await loginUser(user);

    if (!userLogin) return done(null, false, { message: "Login failed" });
    return done(null, userLogin);
  } catch (error) {
    //return done(error, false)
    console.log(error);
  }
};

/* strategies */
const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

/* inicialización */
passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

/* serialize y deserialize */
//guarda al user en req.session.passport.user
passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=> {
    const user = await getUserByID(id);
    return done(null, user);
});
