import { useNavigate } from "react-router-dom";
import styles from "../styles/MovieCard.module.css";
import  noImage from '../images/no-image.webp' 
import { useAuth } from "../context/Auth";

const MovieCard = ({ movie }) => {
  const { id, poster_path, overview, vote_average, title } = movie;
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const navigate = useNavigate();
  const {currentUser} = useAuth()
  const setVoteColor = (vote)=>{
    if(vote>=8) return 'green'
    else if(vote>=6.5)return 'goldenrod'
    else return 'red'
  }


  return (
    <div className={styles.movie} onClick={() => navigate(`/details/${id}`)}>
      {poster_path && <img src={`${imgUrl}${poster_path}`} alt="movie poster" />}
      {!poster_path&&(<img src={noImage} alt="movie poster" />)}
      <div className="text-center p2 bg-dark text-white">
        <h5>{title}</h5>

        {currentUser&&(
          <span className={styles.vote} style={{backgroundColor: setVoteColor(vote_average)}}>
              {vote_average}
          </span>
        )}
      </div>
      <div className={styles.overview}>
        <h2>Overview</h2>
        <h5>{title}</h5>

        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
