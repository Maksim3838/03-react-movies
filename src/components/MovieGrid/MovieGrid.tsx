interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onMovieSelect }: MovieGridProps) {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onMovieSelect(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
}
