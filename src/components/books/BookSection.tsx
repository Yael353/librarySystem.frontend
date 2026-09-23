"use client";

import { BookCard } from "./BookCard";
import type { Book } from "@/app/types/book";

interface BookSectionProps {
  title: string;
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  emptyMessage?: string;
}

export function BookSection({
  title,
  books,
  isLoading,
  isError,
  emptyMessage = "Inga böcker i denna kategori än.",
}: BookSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-text">{title}</h2>

      {isLoading && <p className="text-text-muted text-sm">Laddar...</p>}

      {isError && (
        <p className="text-danger text-sm">Kunde inte hämta böcker.</p>
      )}

      {!isLoading && !isError && (!books || books.length === 0) && (
        <p className="text-text-muted text-sm">{emptyMessage}</p>
      )}

      {!isLoading && !isError && books && books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
