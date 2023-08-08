import * as userServices from "../services/userServices.js";

export const registerUserC = async (req, res) => {
  try {
    const newUser = await userServices.registerUserService(req.body);
    if (newUser) res.redirect("/login");
    else res.redirect("/error-register");
  } catch (error) {
    console.log(error);
  }
};

export const loginUserC = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await userServices.loginUserServices(req.body);

    if (userExist) {
      console.log(`req.session en login:  ${req.session}`);
      req.session.email = email;

      console.log(`req.session en login + email:  ${req.session.body}`);

      res.redirect("/products?page=1");
    } else res.redirect("/error-login");
  } catch (error) {
    console.log(error);
  }
};

export const logoutUserC = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
