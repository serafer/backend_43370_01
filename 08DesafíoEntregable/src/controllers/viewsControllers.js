import { getProductPaginationInfo } from "./productControllers.js";

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

export const profile = async (req, res, next) => {
  try {
    const userExists = await req.session.email;
    console.log("userExists en profile " + userExists);
    if (userExists) {
      res.render("profile");
    } else {
      res.render("login");
    }
  } catch (error) {
    next(error.message);
  }
};

export const products = async (req, res, next) => {
  try {
    const userExists = await req.session.email;
   
    const {
      hasPrevPage,
      hasNextPage,
      nextPage,
      prevPage,
      limit,
      page,
      totalPages,
      products,
    } = await getProductPaginationInfo();

    //console.log(products);

    const productsMap = products.map((product) => product.toObject());

    //console.log(productsMap);

    if (userExists) {
      res.render("products", {
        productsMap,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        limit,
        page,
        totalPages,
        products,
        userExists,
      });
    } else {
      res.render("login");
    }
  } catch (error) {
    next(error.message);
  }
};
