import { Request, Response, NextFunction } from 'express';
import { Author, authors, getNextAuthorId } from '../models/author';
import { books } from '../models/book';
import { ApiError } from '../middleware/errorHandler';

export function createAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;
    const newAuthor: Author = { id: getNextAuthorId(), name: name.trim() };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
}

export function getAllAuthors(req: Request, res: Response) {
  res.json(authors);
}

export function getAuthorById(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);
  if (!author) {
    return next(new ApiError(404, 'Author not found'));
  }
  res.json(author);
}

export function updateAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) {
      return next(new ApiError(404, 'Author not found'));
    }
    const { name } = req.body;
    author.name = name.trim();
    res.json(author);
  } catch (err) {
    next(err);
  }
}

export function deleteAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) {
      return next(new ApiError(404, 'Author not found'));
    }
    authors.splice(index, 1);
    for (let i = books.length - 1; i >= 0; i--) {
      if (books[i].authorId === id) {
        books.splice(i, 1);
      }
    }
    res.json({ message: 'Author and associated books deleted' });
  } catch (err) {
    next(err);
  }
}

export function getBooksByAuthor(req: Request, res: Response, next: NextFunction) {
  const authorId = parseInt(req.params.id);
  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return next(new ApiError(404, 'Author not found'));
  }
  const authorBooks = books.filter(b => b.authorId === authorId);
  res.json(authorBooks);
}
