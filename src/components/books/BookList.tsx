"use client";

import { Book } from "@/app/types/book";
import { useBooks } from "@/hooks/useBooks";

export function BookList() {
  const { data: books, isLoading, isError, error } = useBooks();

  if (isLoading) {
    return <p className="text-text-muted">Laddar böcker...</p>;
  }

  if (isError) {
    return (
      <p className="text-danger">
        Kunde inte hämta böcker: {(error as Error).message}
      </p>
    );
  }

  if (!books || books.length === 0) {
    return <p className="text-text-muted">Inga böcker hittades.</p>;
  }

  return (
    <ul className="space-y-3">
      {books.map((book: Book) => (
        <li
          key={book.id}
          className="border border-border rounded-lg p-4 hover:bg-background transition bg-surface"
        >
          <h3 className="font-semibold text-lg text-text">{book.title}</h3>
          {book.subtitle && (
            <p className="text-text-muted text-sm">{book.subtitle}</p>
          )}
          <p className="text-text text-sm mt-1">av {book.author}</p>
          <p className="text-text-muted text-xs mt-1">ISBN: {book.isbn}</p>

          <span
            className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded ${
              book.isAvailable
                ? "bg-success-light text-success"
                : "bg-danger-light text-danger"
            }`}
          >
            {book.isAvailable ? "Tillgänglig" : "Utlånad"}
          </span>

          {book.subjects.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {book.subjects.slice(0, 3).map((subject, i) => (
                <span
                  key={i}
                  className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
