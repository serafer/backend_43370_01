import { Router } from "express";
import { login, register, errorLogin, errorRegister } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";
import passport from "passport";


const router = Router();


router.get('/register', register);
router.get('/error-register', errorRegister);
router.get('/login', login);
router.get('/error-login', errorLogin);
router.get('/logout', logoutUserC);

router.get('/products',  passport.authenticate("jwt") , getproductPaginate);

export default router;