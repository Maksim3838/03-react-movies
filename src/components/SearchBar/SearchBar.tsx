import type { FormEventHandler } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const query = inputValue.trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
    setInputValue(""); // очищаємо поле
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movies..."
          autoComplete="off"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search movies"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}