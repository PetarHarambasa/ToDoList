import express from 'express';
import body_parser from 'body-parser';
import { get_todo, add_todo, delete_todo, update_todo, get, create, update, deleteOne } from '../controllers/todo.controller.js'

const router = express.Router();
router.use(body_parser.json());

router.get('', get)
router.post('', create)
router.delete('/:id', deleteOne)
router.put('/:id', update)

export default router;
