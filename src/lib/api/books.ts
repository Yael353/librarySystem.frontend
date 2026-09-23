import { Book, CreateBookInput, OpenLibraryBook } from "@/app/types/book";
import { apiClient } from "./client";

export const booksApi = {
  /**
   * GET /api/Books
   * Hämtar alla böcker
   */
  getAll: async (): Promise<Book[]> => {
    const { data } = await apiClient.get<Book[]>("/Books");
    return data;
  },

  /**
   * GET /api/Books/{id}
   * Hämtar en bok via id
   */
  getById: async (id: string): Promise<Book> => {
    const { data } = await apiClient.get<Book>(`/Books/${id}`);
    return data;
  },

  /**
   * GET /api/Books/search?query=...
   * Söker i Open Library (externa böcker)
   */
  searchOpenLibrary: async (query: string): Promise<OpenLibraryBook[]> => {
    const { data } = await apiClient.get<OpenLibraryBook[]>("/Books/search", {
      params: { query },
    });
    return data;
  },

  /**
   * POST /api/Books
   * Skapar en ny bok
   */
  create: async (input: CreateBookInput): Promise<Book> => {
    const { data } = await apiClient.post<Book>("/Books", input);
    return data;
  },

  /**
   * PUT /api/Books/{id}
   * Uppdaterar en bok
   */
  update: async (id: string, input: CreateBookInput): Promise<Book> => {
    const { data } = await apiClient.put<Book>(`/Books/${id}`, input);
    return data;
  },

  /**
   * DELETE /api/Books/{id}
   * Tar bort en bok
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/Books/${id}`);
  },
};
