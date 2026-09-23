"use client";

import { useTopBooks, useBooksByGenre } from "@/hooks/useBooks";
import { BookSection } from "@/components/books/BookSection";

export default function Home() {
  const top = useTopBooks(5);
  const fantasy = useBooksByGenre("Fantasy", 5);
  const action = useBooksByGenre("Action", 5);
  const scifi = useBooksByGenre("Science Fiction", 5);

  return (
    <main className="max-w-6xl mx-auto p-8 space-y-10">
      {/* Hero */}
      <section className="text-center py-6">
        <h1 className="text-4xl font-bold text-text mb-2">📚 LibrarySystem</h1>
        <p className="text-text-muted">
          Upptäck böcker, hantera lån och reservationer
        </p>
      </section>

      {/* Sektioner */}
      <BookSection
        title="⭐ Topp 5 böcker"
        books={top.data}
        isLoading={top.isLoading}
        isError={top.isError}
      />

      <BookSection
        title="🧙 Fantasy"
        books={fantasy.data}
        isLoading={fantasy.isLoading}
        isError={fantasy.isError}
        emptyMessage="Inga fantasy-böcker i biblioteket än."
      />

      <BookSection
        title="🎬 Action"
        books={action.data}
        isLoading={action.isLoading}
        isError={action.isError}
        emptyMessage="Inga action-böcker i biblioteket än."
      />

      <BookSection
        title="🚀 Science Fiction"
        books={scifi.data}
        isLoading={scifi.isLoading}
        isError={scifi.isError}
        emptyMessage="Inga sci-fi-böcker i biblioteket än."
      />
    </main>
  );
}
