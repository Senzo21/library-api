import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controllers/bookController';
import { validateBook } from '../middleware/validation';

const router = express.Router();

router.post('/', validateBook, createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
