import { Router } from 'express'
import * as controller from '../controllers/chatControllers.js'

const router = Router ()

router.get('/', controller.getChat)

router.post('/', controller.createChat)

export default router
