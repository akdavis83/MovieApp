import MovieCard from "../components/MovieCard"
import { useMovie } from "../context/Movie"

const Home = () => {
  const {movies} = useMovie()
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {movies.map(movie=> <MovieCard movie={movie} key={movie.id}/>)}

    </div>
  )
}

export default Home