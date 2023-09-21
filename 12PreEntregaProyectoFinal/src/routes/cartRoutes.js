import { Router } from 'express'
import * as controller from '../controllers/cartControllers.js'
import passport from 'passport'

const router = Router ()

router.get('/', passport.authenticate("jwt") , controller.getCart)

router.get('/:id', passport.authenticate("jwt") , controller.getCartById)

router.post('/', passport.authenticate("jwt") , controller.createCart)

router.post('/:id/prod/:productId', passport.authenticate("jwt") , controller.saveProductToCart)

router.delete('/:id/prod/:productId', passport.authenticate("jwt") , controller.deleteProductInCart)

router.delete('/:id', passport.authenticate("jwt") , controller.cleanCart)

router.put ('/:id/prod/:productId', passport.authenticate("jwt") , controller.updateQuantityInCart)

router.put ('/:id', passport.authenticate("jwt") , controller.updateCart)

router.post ('/:id/purchase', passport.authenticate('jwt') , controller.generateTicket)

router.post('/purchase', passport.authenticate("jwt") ,controller.generateTicket)

export default router