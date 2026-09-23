"use client";

import Image from "next/image";
import type { Book } from "@/app/types/book";

interface BookCardProps {
  book: Book;
  onClick?: (book: Book) => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <article
      onClick={() => onClick?.(book)}
      className={`flex flex-col bg-surface border border-border rounded-lg overflow-hidden transition hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Omslagsbild */}
      <div className="aspect-2/3 bg-background relative">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={`Omslag till ${book.title}`}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">
            Ingen bild
          </div>
        )}
      </div>

      {/* Innehåll */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3
          className="font-semibold text-sm text-text line-clamp-2"
          title={book.title}
        >
          {book.title}
        </h3>

        {book.subtitle && (
          <p
            className="text-text-muted text-xs line-clamp-1"
            title={book.subtitle}
          >
            {book.subtitle}
          </p>
        )}

        <p className="text-text-muted text-xs">{book.author}</p>

        <div className="mt-auto pt-2 flex flex-wrap gap-1 items-center">
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded ${
              book.isAvailable
                ? "bg-success-light text-success"
                : "bg-danger-light text-danger"
            }`}
          >
            {book.isAvailable ? "Tillgänglig" : "Utlånad"}
          </span>

          {book.subjects.slice(0, 2).map((subject, i) => (
            <span
              key={i}
              className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
