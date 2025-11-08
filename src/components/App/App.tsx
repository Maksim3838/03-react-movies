
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("VITE_TMDB_TOKEN is not defined in .env file");
  }

    async function handleSearch(query: string) {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setMovies([]);
    setIsError(false);
    setLoading(true);

    try {
      const response = await axios.get<{ results: Movie[] }>(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: { query, include_adult: false },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(response.data.results);
    } catch (error) {
      setIsError(true);
      toast.error("Error fetching movies.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

   function handleMovieSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

    function closeModal() {
    setSelectedMovie(null);
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {loading && <Loader />}
      {!loading && isError && <ErrorMessage />}
      {!loading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
