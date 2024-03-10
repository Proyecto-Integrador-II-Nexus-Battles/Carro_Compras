import {Router} from 'express'
import {
    getDataController
} from "../controllers/getdata.controllers.js"

const router = Router()

router.post('/ADD-CARD', getDataController.ADD_CARD);
router.post('/DELETE-CARD', getDataController.DELETE_CARD);
router.post('/LIST-CARD', getDataController.LIST_CARD);
router.post('/PRICE-CARD', getDataController.PRICE_CARD);

export default router;