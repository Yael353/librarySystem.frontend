"use client";

import { Book } from "@/app/types/book";
import { useBooks } from "@/hook/useBooks";

export function BookList() {
  const { data: books, isLoading, isError, error } = useBooks();

  if (isLoading) {
    return <p className="text-gray-500">Laddar böcker...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-600">
        Kunde inte hämta böcker: {(error as Error).message}
      </p>
    );
  }

  if (!books || books.length === 0) {
    return <p className="text-gray-500">Inga böcker hittades.</p>;
  }

  return (
    <ul className="space-y-3">
      {books.map((book: Book) => (
        <li
          key={book.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
        >
          <h3 className="font-semibold text-lg">{book.title}</h3>
          {book.subtitle && (
            <p className="text-gray-600 text-sm">{book.subtitle}</p>
          )}
          <p className="text-gray-700 text-sm mt-1">av {book.author}</p>
          <p className="text-gray-500 text-xs mt-1">ISBN: {book.isbn}</p>
          <span
            className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded ${
              book.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.isAvailable ? "Tillgänglig" : "Utlånad"}
          </span>
        </li>
      ))}
    </ul>
  );
}
