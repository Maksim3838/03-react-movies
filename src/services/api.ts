import axios from "axios";
import type { Movie } from "../types/types";

const token = import.meta.env.VITE_TMDB_TOKEN;

if (!token) {
  throw new Error("VITE_TMDB_TOKEN is not defined in .env file");
}

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axiosInstance.get("/search/movie", {
    params: { query },
  });

  return response.data.results as Movie[];
}
