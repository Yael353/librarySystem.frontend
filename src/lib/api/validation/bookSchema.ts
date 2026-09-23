import { z } from "zod";

/**
 * Zod-schema för att skapa/uppdatera en bok.
 */
export const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Titel får inte vara tom")
    .max(200, "Titel får max vara 200 tecken"),
  subtitle: z
    .string()
    .max(200, "Undertext får max vara 200 tecken")
    .optional()
    .or(z.literal("")),
  author: z
    .string()
    .min(1, "Författare får inte vara tom")
    .max(100, "Författare får max vara 100 tecken"),
  isbn: z
    .string()
    .regex(/^(\d{10}|\d{13})$/, "ISBN måste vara 10 eller 13 siffror"),
  coverUrl: z
    .string()
    .url("Måste vara en giltig URL")
    .optional()
    .or(z.literal("")),
  subjects: z
    .array(z.string().min(1).max(50))
    .max(5, "Max 5 ämnen")
    .optional()
    .default([]),
});

/**
 * Input-typ: vad formuläret skickar in (subjects kan vara undefined)
 */
export type BookFormInput = z.input<typeof bookSchema>;

/**
 * Output-typ: vad som kommer ut efter Zod-validering (subjects är alltid en array)
 */
export type BookFormData = z.output<typeof bookSchema>;
