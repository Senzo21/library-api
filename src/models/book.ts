export interface Book {
  id: number;
  title: string;
  authorId: number;
  year: number;
}

export const books: Book[] = [];
let nextBookId = 1;

export function getNextBookId(): number {
  return nextBookId++;
}
