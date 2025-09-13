export interface Author {
  id: number;
  name: string;
}

export const authors: Author[] = [];
let nextAuthorId = 1;

export function getNextAuthorId(): number {
  return nextAuthorId++;
}
