import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import { fetchMovies } from "../../services/api";
import type { Movie } from "../../types/movie"; 

export default function App() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 

    async function handleSearch(query: string) {
    setLoading(true);
    setError(null);      
    setMovies([]);       

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error(`No movies found for "${query}".`);
        return;
      }

      setMovies(results);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }

   function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }

    function handleCloseModal() {
    setSelectedMovie(null);
  }

   return (
    <div>
      <h1>Movie Search</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

            {loading && <Loader />}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

           {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
