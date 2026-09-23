"use client";

import { useQuery } from "@tanstack/react-query";
import { booksApi } from "@/lib/api/books";

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getAll,
  });
}

export function useTopBooks(count: number = 5) {
  return useQuery({
    queryKey: ["books", "top", count],
    queryFn: () => booksApi.getTop(count),
  });
}

export function useBooksByGenre(genre: string, count: number = 10) {
  return useQuery({
    queryKey: ["books", "genre", genre, count],
    queryFn: () => booksApi.getByGenre(genre, count),
    enabled: !!genre,
  });
}
