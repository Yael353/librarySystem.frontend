"use client";

import { useQuery } from "@tanstack/react-query";
import { booksApi } from "@/lib/api/books";

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: booksApi.getAll,
  });
}
