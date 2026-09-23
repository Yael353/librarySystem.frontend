// src/types/book.ts

/**
 * En bok som den returneras från backend (GET /api/books)
 */
export interface Book {
  id: string;
  title: string;
  subtitle?: string | null;
  author: string;
  isbn: string;
  isAvailable: boolean;
  coverUrl?: string | null;
}


//   Input för att skapa eller uppdatera en bok
//   (POST /api/books, PUT /api/books/{id})
 
export interface CreateBookInput {
  title: string;
  subtitle?: string;
  author: string;
  isbn: string;
  coverUrl?: string;
}

//  Open Library
// (GET /api/books/search?query=...)
// 
export interface OpenLibraryBook {
  title: string;
  subtitle?: string | null;
  author: string;
  isbn: string;
  coverUrl?: string | null;
  publishYear?: number | null;
}
