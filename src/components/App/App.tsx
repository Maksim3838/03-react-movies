import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  async function handleSearch(formData: FormData) {
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header>
      <form action={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Enter a movie name..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
