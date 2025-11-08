import { Movie } from "./types/movie";

const [movies, setMovies] = useState<Movie[]>([]);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

function handleMovieSelect(movie: Movie) {
  setSelectedMovie(movie);
}
