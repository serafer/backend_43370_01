import { Router } from "express";
import * as controller from "../controllers/productControllers.js"
import { isAuth } from "../middlewares/auth.js";
import { checkRole } from "../middlewares/checkRole.js";


const router = Router ()

router.get('/', checkRole ,controller.getproduct)

router.get('/:id', controller.getProductById)

router.post('/', controller.addProduct)

router.put('/:id', controller.updateProduct)

router.delete('/:id', controller.deleteProduct)



// -------  DTO  ----- // 

router.get('/dto/:id', controller.getByIdDTO)
router.post('/dto', controller.createProdDTO)

export default router