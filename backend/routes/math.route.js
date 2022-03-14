import express from 'express';
import body_parser from 'body-parser';
import {sum, sub, mul, div} from '../controllers/math.controller.js'

const router = express.Router();
router.use(body_parser.json());

router.get('/sum', sum)
router.get('/sub', sub)
router.get('/mul', mul)
router.get('/div', div)

export default router;