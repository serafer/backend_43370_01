import { Router } from "express";
import { login, logoutUserC, current, getAll, createUserMocks, getUsersMocks } from "../controllers/userControllers.js";
import passport from "passport";
import { ckeckAdminRole } from "../middlewares/checkRole.js";
const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/error-register",
    passReqToCallback: true,
  })
);

router.post("/login", login )

router.get("/getuser", passport.authenticate('jwt') , ckeckAdminRole , getAll )

router.get("/current", passport.authenticate('jwt') , current )

router.get('/register-github', passport.authenticate('github', {scope: ['user:email']}))

/* los success y failure van en el endpoint del callbackURL */
router.get('/profile-github',   passport.authenticate("github", {
    scope: ["user:email"],
    failureRedirect: "/error-login",
    successRedirect: "/products",
  })
  );

router.get("/logout", logoutUserC);


router.post("/mockingusers", createUserMocks);
router.get("/get-mockingusers", getUsersMocks);



export default router;
