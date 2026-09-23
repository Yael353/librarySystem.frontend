"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { booksApi } from "@/lib/api/books";
import { CreateBookInput } from "@/app/types/book";


export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBookInput) => booksApi.create(input),
    onSuccess: (book) => {
      toast.success(`Boken "${book.title}" skapades`);
      // Ogiltigförklara cache så listan hämtas på nytt
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
