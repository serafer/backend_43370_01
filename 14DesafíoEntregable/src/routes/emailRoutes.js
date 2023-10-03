import { Router } from "express";
import { sendMailEthereal, sendMailGmail } from "../controllers/emailControllers.js";
import passport from 'passport'
const router = Router ()


router.post('/ethereal', passport.authenticate("jwt"), sendMailEthereal);

router.post('/gmail', passport.authenticate("jwt"), sendMailGmail);

export default router