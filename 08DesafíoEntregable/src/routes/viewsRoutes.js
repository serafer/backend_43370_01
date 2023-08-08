import { Router } from "express";
import { login, register, errorLogin, errorRegister, profile, products } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";


const router = Router();

router.get('/chat', (req, res) => {
    res.render('chat')
});



router.get('/register', register);
router.get('/error-register', errorRegister);
router.get('/login', login);
router.get('/error-login', errorLogin);
router.get('/profile', profile);
router.get('/logout', logoutUserC);

router.get('/products', products);


export default router;