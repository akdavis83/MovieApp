import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { logout } from "../firebase";
import { useState } from "react";
import { useMovie } from "../context/Movie";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { setMovies} = useMovie()
  const [search, setSearch] = useState();

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_movieApiKey}&query=`
  const baseUrl = 'https://api.themoviedb.org/3'
  const movieUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_movieApiKey}`

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };


  const fetchMovies = async()=>{
    const res = await axios.get(movieUrl)
    setMovies(res.data.results)
    navigate('/')
  }

  const handleInput = (e) => {
    if(e.target.value==='')
      fetchMovies();  
    setSearch(e.target.value)
    
  };




  const searchHandler = async(e)=>{
    e.preventDefault();
    if(search.trim()==='')
        toast.error('Please enter a movie name ')
    const res = await axios(`${searchUrl}${search}`)
    if(res.data.results.length>0){
      setMovies(res.data.results)
      navigate('/')
    }


  }
  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <div className="container flex-column flex-md-row">
        <div className="navbar-brand" style={{ cursor: "pointer" }} onClick={()=>navigate('/')}>
          <h4 className="text-danger">Movie App</h4>
        </div>

        <div className="d-flex alight-items-center flex-column flex-md-row w-100">
          <div className="ms-md-auto">
            {currentUser && (
              <div className="d-flex mb-2 mb-md-0">
                <form className="d-flex">
                  <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Search"
                    value={search}
                    onChange={handleInput}
                  />
                  <button onClick={searchHandler} className="btn btn-outline-success">Search</button>
                </form>
                <h4 className="text-capitalize d-inline-block text-warning mx-2"> {currentUser?.displayName}</h4>
                <button className="btn btn-outline-light" onClick={logoutHandler}> Logout</button>
              </div>
            )}

            {!currentUser && (
              <>
                <Link className="btn btn-outline-light ms-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-light ms-2" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
