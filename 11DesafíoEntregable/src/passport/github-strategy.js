import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import { getUserByEmail, registerUser } from "../daos/mongodb/userDao.js";
import 'dotenv/config'


const strategyOptions = {
  clientID: process.env.GITHUB_STRATEGY_CLIENT_ID,
  clientSecret: process.env.GITHUB_STRATEGY_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_STRATEGY_CALLBACK_URL,
  scope: "user:email",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  //console.log("profile", profile);
  //console.log('email:', profile.emails[0].value);

  const email = profile.emails[0].value;

  //console.log("email:", email);

  const user = await getUserByEmail(email);

  //console.log("user", user);
  
  const first_name = profile._json.name
    ? profile._json.name
    : profile._json.login;

  //console.log('first_name: ', first_name);

  if (!email) return done(null, false);

  if (user) return done(null, user);

  //console.log("pass id", profile._json.node_id);

  const newUser = await registerUser({
    first_name: first_name,
    last_name: " ",
    email,
    password: profile._json.node_id,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
