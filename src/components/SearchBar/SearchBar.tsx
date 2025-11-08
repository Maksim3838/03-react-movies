import type { FormEventHandler } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") || "").trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
    event.currentTarget.reset();
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
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
}
