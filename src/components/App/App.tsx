import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  const [movies, setMovies] = useState<string[]>([]); 

  
  function handleSearch(query: string) {
    console.log("Search query:", query);

        setMovies((prev) => [...prev, query]);

      }

  return (
    <div>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />

      <h2>Previous searches:</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}
