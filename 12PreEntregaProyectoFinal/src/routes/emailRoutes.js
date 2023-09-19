import { Router } from "express";
import { sendMailEthereal, sendMailGmail } from "../controllers/emailControllers.js";
const router = Router ()


router.post('/ethereal', sendMailEthereal);

router.post('/gmail', sendMailGmail);

export default router