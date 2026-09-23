"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookSchema,
  type BookFormInput,
  type BookFormData,
} from "@/lib/api/validation/bookSchema";
import { useCreateBook } from "@/hooks/useCreateBook";
import { TagInput } from "@/components/common/TagInput";

export function BookForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookFormInput, unknown, BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      subjects: [],
    },
  });

  const createBook = useCreateBook();

  const onSubmit = async (data: BookFormData) => {
    const payload = {
      title: data.title,
      subtitle: data.subtitle || undefined,
      author: data.author,
      isbn: data.isbn,
      coverUrl: data.coverUrl || undefined,
      subjects: data.subjects,
    };

    await createBook.mutateAsync(payload);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border border-border rounded-lg p-6 bg-surface"
    >
      <h2 className="text-xl font-semibold mb-2 text-text">Lägg till bok</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-text">
          Titel *
        </label>
        <input
          {...register("title")}
          className="w-full border border-border rounded px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Bokens titel"
        />
        {errors.title && (
          <p className="text-danger text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-text">
          Undertext
        </label>
        <input
          {...register("subtitle")}
          className="w-full border border-border rounded px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Valfri undertext"
        />
        {errors.subtitle && (
          <p className="text-danger text-sm mt-1">{errors.subtitle.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-text">
          Författare *
        </label>
        <input
          {...register("author")}
          className="w-full border border-border rounded px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Författarens namn"
        />
        {errors.author && (
          <p className="text-danger text-sm mt-1">{errors.author.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-text">
          ISBN *
        </label>
        <input
          {...register("isbn")}
          className="w-full border border-border rounded px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="10 eller 13 siffror"
        />
        {errors.isbn && (
          <p className="text-danger text-sm mt-1">{errors.isbn.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-text">
          Omslagsbild (URL)
        </label>
        <input
          {...register("coverUrl")}
          className="w-full border border-border rounded px-3 py-2 bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="https://..."
        />
        {errors.coverUrl && (
          <p className="text-danger text-sm mt-1">{errors.coverUrl.message}</p>
        )}
      </div>

      {/* SUBJECTS / ÄMNEN */}
      <div>
        <label className="block text-sm font-medium mb-1 text-text">
          Ämnen / genrer (max 5)
        </label>
        <Controller
          control={control}
          name="subjects"
          render={({ field }) => (
            <TagInput
              value={field.value ?? []}
              onChange={field.onChange}
              maxTags={5}
              placeholder="T.ex. Fantasy, Adventure..."
            />
          )}
        />
        {errors.subjects && (
          <p className="text-danger text-sm mt-1">{errors.subjects.message}</p>
        )}
        <p className="text-text-muted text-xs mt-1">
          Tryck Enter eller komma för att lägga till. Klicka × för att ta bort.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || createBook.isPending}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover disabled:opacity-50 transition"
      >
        {createBook.isPending ? "Sparar..." : "Lägg till bok"}
      </button>
    </form>
  );
}
