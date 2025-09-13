import { Request, Response, NextFunction } from 'express';
import { Book, books, getNextBookId } from '../models/book';
import { authors } from '../models/author';
import { ApiError } from '../middleware/errorHandler';

export function createBook(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, authorId, year } = req.body;
    const author = authors.find(a => a.id === authorId);
    if (!author) {
      return next(new ApiError(400, 'Invalid authorId: author does not exist'));
    }
    const duplicate = books.find(b => b.title === title && b.authorId === authorId);
    if (duplicate) {
      return next(new ApiError(409, 'Conflict: Book already exists for this author'));
    }
    const newBook: Book = { id: getNextBookId(), title: title.trim(), authorId, year };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
}

export function getAllBooks(req: Request, res: Response) {
  res.json(books);
}

export function getBookById(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return next(new ApiError(404, 'Book not found'));
  }
  res.json(book);
}

export function updateBook(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) {
      return next(new ApiError(404, 'Book not found'));
    }
    const { title, authorId, year } = req.body;
    const author = authors.find(a => a.id === authorId);
    if (!author) {
      return next(new ApiError(400, 'Invalid authorId: author does not exist'));
    }
    const conflict = books.find(b => b.id !== id && b.title === title && b.authorId === authorId);
    if (conflict) {
      return next(new ApiError(409, 'Conflict: Another book with this title and author exists'));
    }
    book.title = title.trim();
    book.authorId = authorId;
    book.year = year;
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export function deleteBook(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
      return next(new ApiError(404, 'Book not found'));
    }
    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
}
