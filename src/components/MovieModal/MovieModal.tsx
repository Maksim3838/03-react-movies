
import { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}
