"use client";

import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
}

export function TagInput({
  value,
  onChange,
  maxTags = 5,
  placeholder = "Skriv och tryck Enter...",
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (value.length >= maxTags) return;
    if (value.some((t) => t.toLowerCase() === trimmed.toLowerCase())) return;
    onChange([...value, trimmed]);
    setInput("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div className="w-full border border-border rounded px-2 py-2 bg-surface flex flex-wrap gap-1 items-center focus-within:ring-2 focus-within:ring-primary">
      {value.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 text-xs bg-primary-light text-primary px-2 py-1 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="hover:text-primary-hover font-bold"
            aria-label={`Ta bort ${tag}`}
          >
            ×
          </button>
        </span>
      ))}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        disabled={value.length >= maxTags}
        placeholder={
          value.length >= maxTags ? `Max ${maxTags} ämnen` : placeholder
        }
        className="flex-1 min-w-30 outline-none bg-transparent text-sm text-text py-1"
      />
    </div>
  );
}
