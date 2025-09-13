import express from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor
} from '../controllers/authorController';
import { validateAuthor } from '../middleware/validation';

const router = express.Router();

router.post('/', validateAuthor, createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', validateAuthor, updateAuthor);
router.delete('/:id', deleteAuthor);
router.get('/:id/books', getBooksByAuthor);

export default router;
