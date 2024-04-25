import {Router} from 'express'
import {
    getDataController
} from "../controllers/getdata.controllers.js"

const router = Router()

router.post('/ADD-CARD', getDataController.ADD_CARD);
router.post('/CHANGE-CANT', getDataController.CHANGECANT);
router.post('/DELETE-CARD', getDataController.DELETE_CARD);
router.post('/LIST-CARD', getDataController.LIST_CARD);
router.post('/INFO-CARDS', getDataController.INFO_CARDS);
router.post('/DELETE-SHOPPING-CART', getDataController.DELETE_COMPRA)

export default router;