import { Router } from "express";
import { login, register, errorLogin, errorRegister, errorAlert, cartView, getAllUsersViews } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";
import passport from "passport";
import { ckeckAdminRole } from "../middlewares/checkRole.js";


const router = Router();


router.get('/register', register);
router.get('/error-register', errorRegister);
router.get('/login', login);
router.get('/error-login', errorLogin);
router.get('/error-alert', errorAlert);
router.get('/logout', logoutUserC);

router.get('/products',  passport.authenticate("jwt") , getproductPaginate);

router.get('/cart/:id', passport.authenticate("jwt") , cartView);

router.get('/userAdminMenu', passport.authenticate("jwt") , ckeckAdminRole ,  getAllUsersViews);

export default router;