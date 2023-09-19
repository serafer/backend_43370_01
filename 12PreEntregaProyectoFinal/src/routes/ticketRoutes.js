import { Router } from "express";
import { generateTicket } from '../controllers/ticketControllers.js'

const router = Router ()

router.post ('/', generateTicket)

export default router