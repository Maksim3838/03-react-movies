import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/api";  

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  async function handleSearch(query: string) {
    try {
      const fetchedMovies = await fetchMovies(query);

      if (fetchedMovies.length === 0) {
        toast.error(`No movies found for "${query}".`);
        return;
      }

      setMovies(fetchedMovies); 
    } catch (error) {
      toast.error("Something went wrong...");
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />

      <h2>Results:</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
