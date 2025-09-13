import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

export function validateAuthor(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(new ApiError(400, "Invalid author data: 'name' is required and must be a non-empty string."));
  }
  next();
}

export function validateBook(req: Request, res: Response, next: NextFunction) {
  const { title, authorId, year } = req.body;
  if (
    !title || typeof title !== 'string' || title.trim() === '' ||
    authorId === undefined || typeof authorId !== 'number' ||
    year === undefined || typeof year !== 'number'
  ) {
    return next(new ApiError(400, "Invalid book data: 'title' (string), 'authorId' (number), and 'year' (number) are required."));
  }
  next();
}
