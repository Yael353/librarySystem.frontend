import { BookList } from "@/components/BookList";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Böcker</h1>
      <BookList />
    </main>
  );
}
