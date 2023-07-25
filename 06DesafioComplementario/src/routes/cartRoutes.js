import { Router } from 'express'
import * as controller from '../controllers/cartControllers.js'

const router = Router ()

router.get('/', controller.getCart)

router.get('/:id', controller.getCartById)

router.post('/', controller.createCart)

router.post('/:id/prod/:productId', controller.saveProductToCart)

export default router